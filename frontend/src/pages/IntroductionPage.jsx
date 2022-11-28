import React from "react";
import styled from "styled-components";
import { mail_icon } from "../assets";

const IntroductionPage = () => {
  return (
    <>
      <Container>
        <Title>DailyGram</Title>
        <Text>DailyGram에 오신것을 환영합니다.</Text>
        <Text>
          누구든지 쉽게 나만의 인터넷 공간에서 작성할 수 있는 사이트입니다.
        </Text>
        <Text>DailyGram의 모든 서비스는 무료입니다.</Text>
        <Text>당신의 하루를 기록해보세요.</Text>
        <Line />
        <LastText>
          새 기능 및 버그 관련 문의는 <Icon src={mail_icon}/>test@gmail.com 로 문의 부탁드립니다.
        </LastText>
      </Container>
    </>
  );
};

const Container = styled.div`
  min-height: 270px;
  padding-top: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  }
  font-weight: 600;
`;
const Title = styled.div`
  margin: 0 auto;
  margin-bottom: 25px;
  width: 150px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`;
const Text = styled.div`
  text-align: center;
  margin: 0 auto;
  margin-bottom: 15px;
  max-width: 500px;
  text-align: center;
`;
const Line = styled.div`
  margin: 0 auto;
  margin-bottom: 20px;
  max-width: 450px;
  border: 0.5px solid #BBBBBB;
`;
const LastText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 15px;
  max-width: 500px;
  text-align: center;
`;
const Icon = styled.img`
  margin-left: 10px;
  margin-right: 3px;
  height: 23px;
`

export default IntroductionPage;
