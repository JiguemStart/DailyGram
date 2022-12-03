import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const MainPage = () => {

  const isLogin = useSelector((state) => state.isLogin.value);

  return (
    <>
      <Container>
        <Title>DailyGram</Title>
        <Text>매일매일 인터넷 일기장.</Text>
        <Text>당신의 하루를 기록해보세요.</Text>
        <ButtonContainer>
          <LoginButton isLogin={isLogin}>
            <Link to={`/login`} style={{ textDecoration: "none" }}>
              <LinkBox>
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30"
                    width="30"
                    viewBox="0 -7 60 60"
                    fill="#FFFFFF"
                  >
                    <path d="M24.45 42v-3H39V9H24.45V6H39q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm-3.9-9.25L18.4 30.6l5.1-5.1H6v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z" />
                  </svg>
                </Icon>
                <ButtonText>로그인</ButtonText>
              </LinkBox>
            </Link>
          </LoginButton>
          <SignupButton isLogin={isLogin}>
            <Link to={`/signup`} style={{ textDecoration: "none" }}>
              <LinkBox>
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30"
                    width="30"
                    viewBox="0 -7 60 60"
                    fill="#FFFFFF"
                  >
                    <path d="M17.7 28.85q-1.15 0-1.925-.775Q15 27.3 15 26.15t.775-1.925q.775-.775 1.925-.775t1.925.775q.775.775.775 1.925t-.775 1.925q-.775.775-1.925.775Zm12.65 0q-1.15 0-1.925-.775-.775-.775-.775-1.925t.775-1.925q.775-.775 1.925-.775t1.925.775q.775.775.775 1.925t-.775 1.925q-.775.775-1.925.775ZM24 41q7.1 0 12.05-4.95Q41 31.1 41 24q0-1.3-.2-2.55-.2-1.25-.5-2.3-1 .25-2.175.35-1.175.1-2.425.1-4.85 0-9.175-2-4.325-2-7.375-5.7-1.7 4.05-4.875 7.075Q11.1 22 7 23.65V24q0 7.1 4.95 12.05Q16.9 41 24 41Zm0 3q-4.15 0-7.8-1.575-3.65-1.575-6.35-4.275-2.7-2.7-4.275-6.35Q4 28.15 4 24t1.575-7.8Q7.15 12.55 9.85 9.85q2.7-2.7 6.35-4.275Q19.85 4 24 4t7.8 1.575q3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24t-1.575 7.8q-1.575 3.65-4.275 6.35-2.7 2.7-6.35 4.275Q28.15 44 24 44ZM19.4 7.65q4.4 5.15 8.125 7.05 3.725 1.9 8.175 1.9 1.2 0 1.9-.05t1.55-.3Q36.9 12.2 33.025 9.6 29.15 7 24 7q-1.35 0-2.55.2-1.2.2-2.05.45ZM7.45 20.1q2.4-.9 5.475-4.075Q16 12.85 17.3 8.35q-4.35 1.95-6.575 4.975Q8.5 16.35 7.45 20.1ZM19.4 7.65Zm-2.1.7Z" />
                  </svg>
                </Icon>
                <ButtonText>회원가입</ButtonText>
              </LinkBox>
            </Link>
          </SignupButton>
          <WriteButton isLogin={isLogin}>
            <Link to={`/write`} style={{ textDecoration: "none" }}>
              <LinkBox>
                <Icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30"
                    width="30"
                    viewBox="0 -7 60 60"
                    fill="#FFFFFF"
                  >
                    <path d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z" />
                  </svg>
                </Icon>
                <ButtonText>일기작성</ButtonText>
              </LinkBox>
            </Link>
          </WriteButton>
        </ButtonContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 30px;
height: 250px;
box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
}
`;
const Title = styled.div`
  margin: 0 auto;
  margin-bottom: 30px;
  width: 200px;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;
const Text = styled.div`
  margin: 0 auto;
  margin-bottom: 15px;
  width: 200px;
  text-align: center;
`;
const ButtonContainer = styled.div`
  margin: 0 auto;
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  width: 240px;
`;
const LoginButton = styled.div`
  display: ${(props) => {
    return props.isLogin == false ? "block" : "none";
  }};
  width: 100px;
  height: 38px;
  border-radius: 5px;
  background-color: #3f51b5;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
`;
const SignupButton = styled.div`
  display: ${(props) => {
    return props.isLogin == false ? "block" : "none";
  }};
  width: 108px;
  height: 38px;
  border-radius: 5px;
  background-color: #3f51b5;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
`;
const WriteButton = styled.div`
  display: ${(props) => {
    return props.isLogin == false ? "none" : "block";
  }};
  margin: 0 auto;
  width: 108px;
  height: 38px;
  border-radius: 5px;
  background-color: #3f51b5;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 38px;
`;
const Icon = styled.div`
  width: 30px;
`;
const ButtonText = styled.div`
  text-align: center;
  font-weight: 500;
  color: #ffffff;
`;

export default MainPage;
