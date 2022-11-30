import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const FindPasswordPage = () => {
  const [emailActive, setEmailActive] = useState(false); //이메일 input 상태
  const [pwActive, setPwActive] = useState(false); //비밀번호 input 상태
  const [emailValue, setEmailValue] = useState(""); //이메일 input 값
  const [pwValue, setPwValue] = useState(""); // 비밀번호 input 값
  const [emailAvailable, setEmailAvailable] = useState(2);
  const [pwAvailable, setPwAvailable] = useState(2);
  const [quiz, setQuiz] = useState("")
  const [answerActive, setAnswerActive] = useState(false)
  const [answerValue, setAnswerValue] = useState("")
  const [answerAvailable, setAnswerAvailable] = useState(2)
  const [pwCheckActive, setPwCheckActive] = useState(false);
  const [pwCheckValue, setPwCheckValue] = useState("");
  const [pwCheckAvailable, setPwCheckAvailable] = useState(2);

  /** 이메일주소로 질문 리턴받는 api */
  const questionRequest = async () => {
    if (emailAvailable == 1) {
      await axios
        .post(`http://localhost:8080/member/search/question-by-email?email=${emailValue}`)
        .then((res) => {
          console.log(res);
          if (res.data) {
            setQuiz(res.data)
          } else {
            alert("존재하지 않는 이메일입니다.");
          }
        })
        .catch((error) => {
          alert("요청에 실패하였습니다.");
          console.log(error);
        });
    }
  };

    /**비밀번호 찾기 요청 api 수정예정 !!!! */
    const signupRequset = async () => {
      if(emailAvailable == 1 && pwAvailable == 1 && answerAvailable == true &&  pwCheckAvailable == 1) {
      await axios
        .post(`http://localhost:8080/member/search/password`, {
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


/**비밀번호 재확인 유효성 검사 */
const pwReCheckHandler = () => {
  if (!pwCheckActive) {
  } else if (pwValue == pwCheckValue && pwAvailable == 1) {
    setPwCheckAvailable(1); // 1이면 유효
  } else {
    setPwCheckAvailable(0); // 0이면 유효하지 않음
  }
};

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
    emailCheckHandler();
    pwCheckHandler();
    pwReCheckHandler()
    answerCheckHandler();

    document.addEventListener("click", (e) => inputHandler(e.target.id));
    return () => {
      document.removeEventListener("click", (e) => inputHandler(e.target.id));
    };
  }, [emailValue, pwValue, pwCheckValue, answerValue]);

  return (
    <>
      <Container>
        <TitleBox>비밀번호 변경 및 찾기</TitleBox>
        <InputContainer>
          <InputText state={emailActive} available={emailAvailable}>
            이메일 *
          </InputText>
          <EmailInput
            id="email"
            available={emailAvailable}
            onChange={(e) => setEmailValue(e.target.value)}
            onFocus={() => setEmailActive(true)}
            onBlur={() =>
              emailValue.length > 0
                ? setEmailActive(true)
                : setEmailActive(false)
            }
          />
        </InputContainer>
        <QuizAnswerContainer quiz={quiz}>
        <QuizText>Q. {quiz}</QuizText>
        <InputContainer>
          <InputText state={answerActive} available={answerAvailable}>
            비밀번호 변경 답변 *
          </InputText>
          <EmailInput
            id="answer"
            available={answerAvailable}
            onChange={(e) => setAnswerValue(e.target.value)}
            onFocus={() => setAnswerActive(true)}
            onBlur={() =>
              answerValue.length > 0
                ? setAnswerActive(true)
                : setAnswerActive(false)
            }
          />
        </InputContainer>
        <InputContainer>
          <InputText state={pwActive} available={pwAvailable}>
            새로운 비밀번호 (8 글자 이상) *
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
            새로운 비밀번호 재확인 *
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
        </QuizAnswerContainer>
        <LoginButton
          emailAvailable={emailAvailable}
          onClick={() => questionRequest()}
          state={quiz}
        >
          확인
        </LoginButton>
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
display: ${(props) => {
  return props.state ? "none" : "flex";
}};
  align-items: center;
  justify-content: center;
  height: 38px;
  border-radius: 5px;
  color: ${(props) => {
    return props.emailAvailable == 1 ? "#FFFFFF" : "#AAAAAA";
  }};
  background-color: ${(props) => {
    return props.emailAvailable == 1 ? "#3f51b5" : "#DDDDDD";
  }};

  cursor: ${(props) => {
    return props.emailAvailable == 1 ? "pointer" : "";
  }};
  font-weight: 600;
  transition: 0.3s;
`;
const QuizAnswerContainer = styled.div`
display: ${(props) => {
  return props.quiz ? "block" : "none";
}};
`
const QuizText = styled.div`
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
`


export default FindPasswordPage;
