import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../feature/counter/counterSlice";

const AccountPage = () => {
  const [answerActive, setAnswerActive] = useState(false);
  const [pwActive, setPwActive] = useState(false);
  const [pwCheckActive, setPwCheckActive] = useState(false);

  const [answerValue, setAnswerValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [pwCheckValue, setPwCheckValue] = useState("");

  const [pwAble, setPwAble] = useState(2)
  const [pwCheckAble, setPwCheckAble] = useState(2)

  const [caution, setCaution] = useState(false)

  const [quiz, setQuiz] = useState("")

  const [answerAvailable, setAnswerAvailable] = useState(2)

  const navigate = useNavigate()

  const isLogin = useSelector((state) => state.isLogin.value);
  const dispatch = useDispatch()

    /** 이메일주소로 질문 리턴받는 api */
    const questionRequest = async () => {

        await axios
          .post(`http://localhost:8080/member/view/password-question`, {
            accessToken: getCookie("accessToken"),
            refresToken: getCookie("refreshToken"),
            })
          .then((res) => {
            if(res.data.tokenResult == true) {
              setQuiz(res.data.passwordQuestion)
            }
            else {
              setQuiz("비밀번호 질문을 불러오는데 실패하였습니다.")
             }
              

          })
          .catch((error) => {
            alert("요청에 실패하였습니다.");
            console.log(error);
          });
      
    };

        /** 비밀번호 변경 api */
        const pwChangeRequest = async () => {
          if(answerAvailable == 1 && pwAble == 1 && pwCheckAble && 1) {
          await axios
            .post(`http://localhost:8080/member/change/password`, {
              accessToken: getCookie("accessToken"),
             newPassword: pwValue,
              passwordAnswer: answerValue,
              passwordQuestion: quiz,
              refresToken: getCookie("refreshToken"),
              })
            .then((res) => {
              if(res.data.changeResult == true) {
                alert("비밀번호 변경에 성공하였습니다.")
                window.location.reload()
              }
              else {
                alert("비밀번호 변경에 실패하였습니다.")
              }
                
  
            })
            .catch((error) => {
              alert("요청에 실패하였습니다.");
              console.log(error);
            });
          }
      };

        /** 회원탈퇴 요청 api */
        const removeAccount =  () => {
          
          axios({
            method: "delete", // [요청 타입]
            url: "http://localhost:8080/member/withdrawal", // [요청 주소]
            data: {
              accessToken: getCookie("accessToken"),
               refresToken: getCookie("refreshToken"),
            }, // [요청 데이터]
        })
        .then(function(response) {
          if(response.data.withdrawalResult == true) {
            alert("회원탈퇴 되었습니다.")
            dispatch(logout())
            deleteCookie("accessToken")
            deleteCookie("refreshToken")
            navigate("/main")
          }
          else {
            alert("회원탈퇴에 실패하였습니다.")
          }
        })
        .catch(function(error) {
          alert("요청에 실패하였습니다.")
            console.log(error)
        });
          
      };


      /**쿠키값 얻기 */
  function getCookie(name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    
    for (i = 0; i < ARRcookies.length; i++) {     
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            
            x = x.replace(/^\s+|\s+$/g, "");
  
            if (x == name) {
                    return unescape(y);
            }
    }
  }
    /**쿠키값 삭제 */
    var deleteCookie = function(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  }

  /**비밀번호 유효성 검사 */
  const pwHandler = () => {
    if (!pwActive) {

    }
    else if(pwValue.length >= 8) {
      setPwAble(1)
    }
    else {
      setPwAble(0)
    }
  }

  /**비밀번호 확인 유효성 검사 */  
  const pwCheckHandler = () => {
    if (!pwCheckActive) {
      
    }
    else if(pwCheckValue == pwValue && pwCheckValue.length >= 8) {
      setPwCheckAble(1)
    }
    else {
      setPwCheckAble(0)
    }
  }

  const answerCheckHandler = () => {
    if (!answerActive) {
    } else if (answerValue.length > 0) {
      setAnswerAvailable(1); // 1이면 유효
    } else {
      setAnswerAvailable(0); // 0이면 유효하지 않음
    }
  }

  useEffect(()=> {
    pwHandler()
    pwCheckHandler()
    answerCheckHandler()

  }, [pwValue, pwCheckValue, answerValue])

  useEffect(() => {
    questionRequest()
  }, [])

  return (
    <>
      <Title>계정</Title>
      <Container>
        <SemiTitle>비밀번호 변경</SemiTitle>
        <Text>비밀번호 변경을 원하시면 아래 빈칸을 채워주세요.</Text>
        <Text>Q. {quiz}</Text>
        <InputContainer>
          <InputText state={answerActive} available={answerAvailable}>비밀번호 변경 답변 *</InputText>
          <EmailInput
            id="answer"
            available={answerAvailable}
            onChange={(e)=>setAnswerValue(e.target.value)}
            onFocus={() => setAnswerActive(true)}
            onBlur={() => answerValue.length > 0 ? "" : setAnswerActive(false)}
          />
        </InputContainer>
        <InputContainer>
          <InputText state={pwActive}             available={pwAble}>
            변경하실 비밀번호 (8글자 이상) *
          </InputText>
          <EmailInput
            id="pw"
            type="password"
            onChange={(e)=>setPwValue(e.target.value)}
            onFocus={() => setPwActive(true)}
            onBlur={() => pwValue.length > 0 ? "" : setPwActive(false)}
            available={pwAble}
          />
        </InputContainer>
        <InputContainer>
          <InputText state={pwCheckActive}     available={pwCheckAble}>비밀번호 확인 *</InputText>
          <EmailInput
            id="pwCheck"
            type="password"
            onChange={(e)=>setPwCheckValue(e.target.value)}
            onFocus={() => setPwCheckActive(true)}
            onBlur={() => pwCheckValue.length > 0 ? "" : setPwCheckActive(false)}
            available={pwCheckAble}
          />
        </InputContainer>
        <Button onClick={()=>pwChangeRequest()}answerAble={answerAvailable} pwAble={pwAble} pwCheckAble={pwCheckAble}>비밀번호 변경하기</Button>
      </Container>
      <Container>
        <SemiTitle>회원탈퇴</SemiTitle>
        <Text>회원탈퇴를 하시면 그동안 작성해 오셨던 모든 일기가 회원정보와 함께 영구적으로 삭제됩니다. 이렇게 삭제된 회원정보와 일기는 복구가 불가능 합니다. </Text>
        <Button onClick={()=>setCaution(true)}>회원탈퇴</Button>
      </Container>
      <CautionBox state={caution}>
        <Text>정말로 회원 탈퇴를 하시겠습니까?</Text>
        <CautionBoxContainer>
        <CautionButton onClick={() => removeAccount()}>확인</CautionButton>
        <CautionButton onClick={()=>setCaution(false)}>취소</CautionButton>
        </CautionBoxContainer>
      </CautionBox>
    </>
  );
};
const Title = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 50px;
  width: 100px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`;
const Container = styled.div`
  margin: 0 auto;
  margin-bottom: 50px;
  max-width: 610px;
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  };
`;
const SemiTitle = styled.div`
  margin-left: 20px;
  font-size: 18px;
  font-weight: 600;
`;
const Text = styled.div`
  margin-top: 30px;
  margin-bottom: 5px;
  font-weight: 600;
  line-height: 20px;
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

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 38px;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
  color: ${(props) => {
    return props.answerAble == 1 && props.pwAble == 1 && props.pwCheckAble == 1 ? "#FFFFFF" : "#AAAAAA";
  }};
  background-color: ${(props) => {
    return props.answerAble == 1 && props.pwAble == 1 && props.pwCheckAble == 1? "#3f51b5" : "#DDDDDD";
  }};
  transition: 0.3s;

  cursor: ${(props) => {
    return   props.answerAble == 1 && props.pwAble == 1 && props.pwCheckAble == 1? "pointer" : "";
  }};
  &:nth-of-type(3) {
    margin-top: 20px;
    width: 80px;
    color: #FFFFFF;
    background-color: #ff4081;
  };
  cursor: pointer;
`;

const CautionBox = styled.div`
display: ${(props) => {
  return props.state == true ? "block" : "none";
}};
  z-index: 1; 
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 25px;
  width: 320px;
  background-color: #FFFFFF;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%), 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%);
`

const CautionBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const CautionButton = styled.div`
  margin-top: 15px;
  width: 40%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  border-radius: 5px;
  font-weight: 500;
  color: #FFFFFF;
  background-color:  #ff4081;
  cursor: pointer;
  &:nth-of-type(2) {
    background-color: #3f51b5
  };



`


export default AccountPage;
