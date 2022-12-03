import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../feature/counter/counterSlice";

const LoginPage = () => {
  const [emailActive, setEmailActive] = useState(false); //이메일 input 상태
  const [pwActive, setPwActive] = useState(false); //비밀번호 input 상태
  const [emailValue, setEmailValue] = useState(""); //이메일 input 값
  const [pwValue, setPwValue] = useState(""); // 비밀번호 input 값
  const [emailAvailable, setEmailAvailable] = useState(2);
  const [pwAvailable, setPwAvailable] = useState(2);

  const isLogin = useSelector((state) => state.isLogin.value);
  const dispatch = useDispatch()

  const navigate = useNavigate()

  function setCookie(name, value, days) {
    if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
    } else {
           var expires = "";
    }
    
    document.cookie = name + "=" + value + expires + "; path=/";
}


    /** 로그인 요청 api */
    const loginRequest = async () => {
      if(emailAvailable == 1 && pwAvailable == 1) {
      await axios
        .post(`http://localhost:8080/member/login`, {
          email: emailValue,
          password: pwValue
            })
        .then(res => {
          if(res.data.result == true) {
            setCookie("accessToken", res.data.accessToken, 1)
            setCookie("refreshToken", res.data.refreshToken, 1)
            dispatch(login())
            navigate("/main")
          }
          else {
            alert("존재하지 않는 이메일입니다.")
          }
        })
        .catch(error => {
          alert("요청에 실패하였습니다.")
          console.log(error);
        })
      }
    };

  /**input */
  const inputHandler = (id) => {
    if (id == "email") {
      pwValue ? setPwActive(true) : setPwActive(false);
      setEmailActive(true);
    } else if (id == "pw") {
      emailValue ? setEmailActive(true) : setEmailActive(false);
      setPwActive(true);
    } else {
      emailValue ? setEmailActive(true) : setEmailActive(false);
      pwValue ? setPwActive(true) : setPwActive(false);
    }
  };

  /**이메일 유효성 검사 */
  const emailCheckHandler = () => {
    let regex = new RegExp("[a-z0-9]+@+[a-z]+[.]+[a-z]{2,3}"); // 이메일 유효성 검사 정규식
    if (!emailActive) {
    } else if (regex.test(emailValue) == true) {
      setEmailAvailable(1); //1이면 유효
    } else {
      setEmailAvailable(0); //0이면 유효하지 않음
    }
  };

  /**비밀번호 유효성 검사 */
  const pwCheckHandler = () => {
    if (!pwActive) {
    } else if (pwValue.length >= 8) {
      setPwAvailable(1); // 1이면 유효
    } else {
      setPwAvailable(0); // 0이면 유효하지 않음
    }
  };

  /**이벤트 리스너 실행 및 갱신 */
  useEffect(() => {
    emailCheckHandler();
    pwCheckHandler();

    document.addEventListener("click", (e) => inputHandler(e.target.id));
    return () => {
      document.removeEventListener("click", (e) => inputHandler(e.target.id));
    };
  }, [emailValue, pwValue]);

  return (
    <>
      <Container>
        <TitleBox>로그인</TitleBox>
        <InputContainer>
          <InputText state={emailActive} available={emailAvailable}>
            이메일 *
          </InputText>
          <EmailInput
            id="email"
            available={emailAvailable}
            onChange={(e) => setEmailValue(e.target.value)}
            onFocus={() => setEmailActive(true)}
            onBlur={() => emailValue.length > 0 ? setEmailActive(true) : setEmailActive(false)}
          />
        </InputContainer>
        <InputContainer>
          <InputText state={pwActive} available={pwAvailable}>
            비밀번호 (8 글자 이상) *
          </InputText>
          <PasswordInput
            id="pw"
            type="password"
            available={pwAvailable}
            onChange={(e) => setPwValue(e.target.value)}
            onFocus={()=> setPwActive(true)}
            onBlur={() => setPwValue.length > 0 ? setPwActive(true) : setPwActive(false)}
          />
        </InputContainer>
        <LoginButton emailAvailable={emailAvailable} pwAvailable={pwAvailable} onClick={()=>loginRequest()}>로그인</LoginButton>
        <ButtonContainer>
          <Button>
            <Link to={`/signup`} style={{ textDecoration: "none" }}>
              <LinkBox>
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30"
                    width="30"
                    viewBox="0 -7 60 60"
                    fill="#3f51b5"
                  >
                    <path d="M17.7 28.85q-1.15 0-1.925-.775Q15 27.3 15 26.15t.775-1.925q.775-.775 1.925-.775t1.925.775q.775.775.775 1.925t-.775 1.925q-.775.775-1.925.775Zm12.65 0q-1.15 0-1.925-.775-.775-.775-.775-1.925t.775-1.925q.775-.775 1.925-.775t1.925.775q.775.775.775 1.925t-.775 1.925q-.775.775-1.925.775ZM24 41q7.1 0 12.05-4.95Q41 31.1 41 24q0-1.3-.2-2.55-.2-1.25-.5-2.3-1 .25-2.175.35-1.175.1-2.425.1-4.85 0-9.175-2-4.325-2-7.375-5.7-1.7 4.05-4.875 7.075Q11.1 22 7 23.65V24q0 7.1 4.95 12.05Q16.9 41 24 41Zm0 3q-4.15 0-7.8-1.575-3.65-1.575-6.35-4.275-2.7-2.7-4.275-6.35Q4 28.15 4 24t1.575-7.8Q7.15 12.55 9.85 9.85q2.7-2.7 6.35-4.275Q19.85 4 24 4t7.8 1.575q3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24t-1.575 7.8q-1.575 3.65-4.275 6.35-2.7 2.7-6.35 4.275Q28.15 44 24 44ZM19.4 7.65q4.4 5.15 8.125 7.05 3.725 1.9 8.175 1.9 1.2 0 1.9-.05t1.55-.3Q36.9 12.2 33.025 9.6 29.15 7 24 7q-1.35 0-2.55.2-1.2.2-2.05.45ZM7.45 20.1q2.4-.9 5.475-4.075Q16 12.85 17.3 8.35q-4.35 1.95-6.575 4.975Q8.5 16.35 7.45 20.1ZM19.4 7.65Zm-2.1.7Z" />
                  </svg>
                </Icon>
                <ButtonText>회원가입</ButtonText>
              </LinkBox>
            </Link>
          </Button>
          <Button>
            <Link to={`/findPassword`} style={{ textDecoration: "none" }}>
              <LinkBox>
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30"
                    width="30"
                    viewBox="0 -7 60 60"
                    fill="#3f51b5"
                  >
<path d="M14 36q-5 0-8.5-3.5T2 24q0-5 3.5-8.5T14 12q3.9 0 6.575 1.875 2.675 1.875 3.975 4.975H46v10.3h-5.3V36h-9.3v-6.85h-6.85q-1.3 3.1-3.975 4.975Q17.9 36 14 36Zm0-3q3.55 0 5.825-2.35 2.275-2.35 2.675-4.5h12.1V33h3.1v-6.85H43v-4.3H22.5q-.4-2.15-2.675-4.5T14 15q-3.75 0-6.375 2.625T5 24q0 3.75 2.625 6.375T14 33Zm0-5.6q1.45 0 2.425-.975.975-.975.975-2.425 0-1.45-.975-2.425Q15.45 20.6 14 20.6q-1.45 0-2.425.975Q10.6 22.55 10.6 24q0 1.45.975 2.425.975.975 2.425.975Zm0-3.4Z"/></svg>
                </Icon>
                <ButtonText>비밀번호 찾기</ButtonText>
              </LinkBox>
            </Link>
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0 auto;
padding-top: 30px;
padding-left: 15px;
padding-right: 15px;
padding-bottom: 10px;
  max-width: 600px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  };
  
`;
const TitleBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding-left: 15px;
  align-items: center;
  height: 65px;
  color: #ffffff;
  background-color: #3f51b5;
  font-size: 22px;
`;
const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-top: 5px;
`;
const InputText = styled.div`
  position: absolute;
  top: ${(props) => {
    return props.state == true ? "0px" : "17.5px";
  }};
  transition: 0.3s;
  font-size: ${(props) => {
    return props.state == true ? "12px" : "16px";
  }};
  font-weight: 600;
  pointer-events: none;
  color: #aaaaaa;
  color: ${(props) => {
    return props.available == 0 ? "red" : "";
  }};
  color: ${(props) => {
    return props.available == 1 ? "#3f51b5" : "";
  }};
`;
const EmailInput = styled.input`
  padding: 0;
  display: block;
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-bottom: 1px solid #bbbbbb;
  font-size: 16px;
  border-bottom: ${(props) => {
    return props.available == 0 ? "2px solid red" : "";
  }};
  border-bottom: ${(props) => {
    return props.available == 1 ? "2px solid #3f51b5" : "";
  }};
  transition: 0.3s;
`;
const PasswordInput = styled.input`
  padding: 0;
  display: block;
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-bottom: 1px solid #bbbbbb;
  font-size: 16px;
  border-bottom: ${(props) => {
    return props.available == 0 ? "2px solid red" : "";
  }};
  border-bottom: ${(props) => {
    return props.available == 1 ? "2px solid #3f51b5" : "";
  }};
  transition: 0.3s;
`;
const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  border-radius: 5px;
  color: ${(props) => {
    return props.emailAvailable==1 && props.pwAvailable == 1 ? "#FFFFFF" : "#AAAAAA";
  }};
  background-color: ${(props) => {
    return props.emailAvailable==1 && props.pwAvailable == 1 ? "#3f51b5" : "#DDDDDD";
  }};
  font-weight: 600;
  transition: 0.3s;
  cursor: ${(props) => {
    return props.emailAvailable==1 && props.pwAvailable == 1 ? "pointer" : "";
  }};
`;
const ButtonContainer = styled.div`
  margin: 0 auto;
  margin-top: 25px;
  display: flex;
`;
const Button = styled.div`
  width: 50%;
  height: 38px;
`;
const LinkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  height: 38px;
`;
const Icon = styled.div`
  width: 30px;
`;
const ButtonText = styled.div`
  text-align: center;
  font-weight: 600;
  color: #3f51b5;
`;

export default LoginPage;
