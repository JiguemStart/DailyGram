import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const SignupPage = () => {
  const [emailActive, setEmailActive] = useState(false); //이메일 input 상태
  const [emailCheckActive, setEmailCheckActive] = useState(false);
  const [pwActive, setPwActive] = useState(false); //비밀번호 input 상태
  const [pwCheckActive, setPwCheckActive] = useState(false);
  const [emailValue, setEmailValue] = useState(""); //이메일 input 값
  const [emailCheckValue, setEmailCheckValue] = useState("");
  const [pwValue, setPwValue] = useState(""); // 비밀번호 input 값
  const [pwCheckValue, setPwCheckValue] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(2);
  const [emailCheckAvailable, setEmailCheckAvailable] = useState(2);
  const [pwAvailable, setPwAvailable] = useState(2);
  const [pwCheckAvailable, setPwCheckAvailable] = useState(2);
  const [quizValue, setQuizValue] = useState("")
  const [quizActive, setQuizActive] = useState(false)
  const [quizAvailable, setQuizAvailable] = useState(2)
  const [answerValue, setAnswerValue] = useState("")
  const [answerActive, setAnswerActive] = useState(false)
  const [answerAvailable, setAnswerAvailable] = useState(2)


  const [privacyValue, setPrivacyValue] = useState(false)
  const [privacyActive, setPrivacyActive] = useState(false)

  const [emailCheck, setEmailCheck] = useState(false)

  const navigate = useNavigate()

  /**회원가입 요청 api */
  const signupRequset = async () => {
    if(emailAvailable == 1 && pwAvailable == 1 && privacyValue == true && answerAvailable == 1 && quizAvailable == 1) {
    await axios
      .post(`http://localhost:8080/member/register`, {
          email: emailValue,
          password: pwValue,
          passwordAnswer: answerValue,
          passwordQuestion: quizValue
          })
      .then(res => {
        if(res.data == true) {
          alert("회원가입에 성공하였습니다.")
          navigate("/main")
        }
        
      })
      .catch(error => {
        alert("회원가입에 실패하였습니다.")
        console.log(error);
      })
    }
  };

    /**이메일 중복확인 요청 api */
    const emailCheckRequest = async () => {
      if(emailAvailable == 1 && emailCheck == false) {
      await axios
        .post(`http://localhost:8080/member/duplicate-check?email=${emailValue}`)
        .then(res => {
          if(res.data == true) {
            alert("중복되지 않은 이메일입니다.")
            setEmailCheck(true)
          }
          else {
            alert("중복된 이메일입니다.")
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
    switch (id) {
      case "email":
        pwValue ? setPwActive(true) : setPwActive(false);
        emailCheckValue ? setEmailCheckActive(true) : setEmailCheckActive(false)
        pwCheckValue ? setPwCheckActive(true) : setPwCheckActive(false)
        setEmailActive(true);
        break;
      case "pw":
        emailValue ? setEmailActive(true) : setEmailActive(false);
        emailCheckValue ? setEmailCheckActive(true) : setEmailCheckActive(false)
        pwCheckValue ? setPwCheckActive(true) : setPwCheckActive(false)
        setPwActive(true);
        break;
      case "emailCheck":
        emailValue ? setEmailActive(true) : setEmailActive(false);
        pwValue ? setPwActive(true) : setPwActive(false);
        pwCheckValue ? setPwCheckActive(true) : setPwCheckActive(false)
        setEmailCheckActive(true);
        break;
      case "pwCheck":
        emailValue ? setEmailActive(true) : setEmailActive(false);
        pwValue ? setPwActive(true) : setPwActive(false);
        emailCheckValue ? setEmailCheckActive(true) : setEmailCheckActive(false)
        setPwCheckActive(true);
        break;
      default:
        emailValue ? setEmailActive(true) : setEmailActive(false);
        pwValue ? setPwActive(true) : setPwActive(false);
        emailCheckValue ? setEmailCheckActive(true) : setEmailCheckActive(false)
        pwCheckValue ? setPwCheckActive(true) : setPwCheckActive(false)
        break;
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
    setEmailCheck(false)
  };

  /**이메일 재확인 유효성 검사 */
  const emailReCheckHandler = () => {
    if (!emailCheckActive) {  // 렌더링과 동시에 함수가 실행이 되었을 때 아래가 실행이 안되게끔함 아래가 실행되면 바로 빨간줄 뜨기 때문
    } else if (emailValue == emailCheckValue && emailAvailable == 1) { // 이메일 값과 이메일 체크값이 같으면
      setEmailCheckAvailable(1); //1이면 유효
    } else {
      setEmailCheckAvailable(0); //0이면 유효하지 않음
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

  /**비밀번호 재확인 유효성 검사 */
  const pwReCheckHandler = () => {
    if (!pwCheckActive) {
    } else if (pwValue == pwCheckValue && pwAvailable == 1) {
      setPwCheckAvailable(1); // 1이면 유효
    } else {
      setPwCheckAvailable(0); // 0이면 유효하지 않음
    }
  };
  /**비밀번호 변경질문 유효성 검사 */
  const quizCheckHandler = () => {
    if (!quizActive) {
    } else if (quizValue.length > 0) {
      setQuizAvailable(1); // 1이면 유효
    } else {
      setQuizAvailable(0); // 0이면 유효하지 않음
    }
  }
  /**비밀번호 변경질문에 대한 답변 유효성 검사 */
  const answerCheckHandler = () => {
    if (!answerActive) {
    } else if (answerValue.length > 0) {
      setAnswerAvailable(1); // 1이면 유효
    } else {
      setAnswerAvailable(0); // 0이면 유효하지 않음
    }
  }

  
  /**이벤트 리스너 실행 및 갱신 */
  useEffect(() => {
    pwCheckHandler();
    emailReCheckHandler();
    pwReCheckHandler();
    quizCheckHandler()
    answerCheckHandler();

    document.addEventListener("click", (e) => inputHandler(e.target.id));
    return () => {
      document.removeEventListener("click", (e) => inputHandler(e.target.id));
    };
  }, [emailValue, pwValue, emailCheckValue, pwCheckValue,, quizValue, answerValue]);

  useEffect(()=> {
    emailCheckHandler();
  }, [emailValue])

  return (
    <>
      <Container>
        <TitleBox>회원가입</TitleBox>
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
          <CheckButton state={emailCheck} onClick={() => emailCheckRequest()}>이메일 중복확인</CheckButton>
        </InputContainer>
        <InputContainer>
          <InputText state={emailCheckActive} available={emailCheckAvailable}>
            이메일 재확인 *
          </InputText>
          <EmailInput
            id="emailCheck"
            available={emailCheckAvailable}
            onChange={(e) => setEmailCheckValue(e.target.value)}
            onFocus={()=> setEmailCheckActive(true)}
            onBlur={() => emailCheckValue.length > 0 ? setEmailCheckActive(true) : setEmailCheckActive(false)}
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
            onBlur={() => pwValue.length > 0 ? setPwActive(true) : setPwActive(false)}
          />
        </InputContainer>
        <InputContainer>
          <InputText state={pwCheckActive} available={pwCheckAvailable}>
            비밀번호 재확인 *
          </InputText>
          <PasswordInput
            id="pwCheck"
            type="password"
            available={pwCheckAvailable}
            onChange={(e) => setPwCheckValue(e.target.value)}
            onFocus={()=> setPwCheckActive(true)}
            onBlur={() => pwCheckValue.length > 0 ? setPwCheckActive(true) : setPwCheckActive(false)}
          />
        </InputContainer>
        <InputContainer>
          <InputText state={quizActive} available={quizAvailable}>
            비밀번호 변경 질문 *
          </InputText>
          <PasswordInput
            id="quiz"
            available={quizAvailable}
            onChange={(e) => setQuizValue(e.target.value)}
            onFocus={()=> setQuizActive(true)}
            onBlur={() => quizValue.length > 0 ? setQuizActive(true) : setQuizActive(false)}
          />
        </InputContainer>
        <InputContainer>
          <InputText state={answerActive} available={answerAvailable}>
            비밀번호 변경 질문에 대한 답 *
          </InputText>
          <PasswordInput
            id="answer"
            available={answerAvailable}
            onChange={(e) => setAnswerValue(e.target.value)}
            onFocus={()=> setAnswerActive(true)}
            onBlur={() => answerValue.length > 0 ? setAnswerActive(true) : setAnswerActive(false)}
          />
        </InputContainer>
        <PrivacyContainer>
          <CheckBox type="checkbox" onChange={()=>setPrivacyValue(prev => !prev)}/>
          <PrivacyButton onClick={()=>setPrivacyActive(true)}>개인정보 취급방침</PrivacyButton>
          <PrivacyText>에 동의합니다.</PrivacyText>
        </PrivacyContainer>
        <LoginButton emailAvailable={emailCheckAvailable} pwAvailable={pwCheckAvailable} check={privacyValue} answerAvailable={answerAvailable} quizAvailable={quizAvailable} onClick={()=>signupRequset()}> 
          회원가입
        </LoginButton>
      </Container>
      <PrivacyNoticeContainer privacyActive={privacyActive}>
      <PrivacyBox>
        <PrivacyTitle>DailyGram 개인정보 처리방침</PrivacyTitle>
        <Text>
        DailyGram이 더 나은 서비스를 제공해 드리기 위해 수집하는 여러분의 개인정보는 아래와 같습니다.
        <br/><br/>
        
        DailyGram은 여러분이 서비스에 처음 가입할 때 여러분의 이메일과, 암호화된 비밀번호, 비밀번호 찾기 질문, 비밀번호 찾기 답변을 수집합니다. 또한, 서비스 이용과정 과정에서 단말기정보(OS, 화면사이즈, 디바이스 아이디), IP주소, 쿠키, 방문일시, 부정이용기록, 서비스 이용 기록 등의 정보가 자동으로 생성되어 수집될 수 있습니다.
        <br/><br/>
        DailyGram은 여러분의 소중한 개인정보를 보호하기 위해 다음과 같은 역할을 합니다.
        <br/><br/>
DailyGram은 사용자의 브라우저, 스마트폰, 디바이스와 DailyGram 웹사이트 간의 모든 통신을 데이터의 기밀성을 유지해줄 수 있는 Https 암호화 인터넷 통신 프로토콜을 이용합니다. 
<br/><br/>
DailyGram은 여러분의 별도 동의가 있는 경우나 법령에 규정된 경우를 제외하고는 여러분의 개인정보를 절대 제3자에게 제공하지 않습니다.
<br/><br/>
DailyGram은 사용자의 개인정보를 중요하게 여깁니다. 사용자가 제공한 개인정보는 DailyGram 서비스를 제공하기 위해서만 사용되며, 여러분의 개인정보를 절대 제 3자에게 제공하지 않습니다.
        </Text>
        <PrivacyOKButton onClick={()=>setPrivacyActive(false)}>확인</PrivacyOKButton>
      </PrivacyBox>
      </PrivacyNoticeContainer>
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

const CheckButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 38px;
border-radius: 5px;
color: ${(props) => {
  return props.state == false
    ? "#FFFFFF"
    : "#AAAAAA";
}};
background-color: ${(props) => {
  return props.state == false
    ? "#3f51b5"
    : "#DDDDDD";
}};
font-weight: 600;
transition: 0.3s;
cursor: ${(props) => {
  return props.state == false
    ? "pointer"
    : "";
}};
`
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
    return props.emailAvailable == 1 && props.pwAvailable == 1 && props.check == true && props.answerAvailable == 1 && props.quizAvailable == 1
      ? "#FFFFFF"
      : "#AAAAAA";
  }};
  background-color: ${(props) => {
    return props.emailAvailable == 1 && props.pwAvailable == 1 && props.check == true && props.answerAvailable == 1 && props.quizAvailable == 1
      ? "#3f51b5"
      : "#DDDDDD";
  }};
  font-weight: 600;
  transition: 0.3s;
  cursor: ${(props) => {
    return props.emailAvailable == 1 && props.pwAvailable == 1 && props.check == true && props.answerAvailable == 1 && props.quizAvailable == 1
      ? "pointer"
      : "";
  }};
`;

const PrivacyContainer = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`

const CheckBox = styled.input`

`

const PrivacyButton = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 20px;
  border-radius: 5px;
  &:hover {
    background-color: #EEEEEE;
  }
  cursor: pointer;
  color: red;
`
const PrivacyText = styled.div`

`
const PrivacyNoticeContainer = styled.div`
  display: ${(props) => {
    return props.privacyActive == false ? "none" : "block"
  }};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  background-color: rgba(0,0,0,0.3);
`

const PrivacyBox = styled.div`
  z-index: 1; 
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translate(-50%, 0);
  padding-top: 45px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 10px;
  width: 75vw;
  background-color: #FFFFFF;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 11px 15px -7px rgb(0 0 0 / 20%), 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%);
`
const PrivacyTitle = styled.div`
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: 700;
  text-align:center;
`
const Text = styled.div`
  margin-bottom: 20px;
  font-weight: 700;
  line-height: 20px;
`

const PrivacyOKButton = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  border-radius: 5px;
  color: #FFFFFF;
  background-color: #3f51b5;
  font-weight: 700;
  cursor: pointer;
`


export default SignupPage;
