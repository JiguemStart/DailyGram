import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { introduction_icon, list_icon, notice_icon, write_icon } from '../assets'

const SideBar = () => {
  return (
    <>
    <Container>
      <Title>메뉴</Title>
      <MenuListContainer>
      <Link to={`/diaryList` } style={{ textDecoration: "none"}}>
        <LinkBox>
          <Icon src={list_icon}/>
          <MenuText>- 일기목록</MenuText>
        </LinkBox>
        </Link>
      </MenuListContainer>
      <MenuListContainer>
      <Link to={`/diaryWrite` } style={{ textDecoration: "none"}}>
        <LinkBox>
        <Icon src={write_icon}/>
          <MenuText>- 일기작성</MenuText>
        </LinkBox>
        </Link>
      </MenuListContainer>
      <MenuListContainer>
      <Link to={`/notice` } style={{ textDecoration: "none"}}>
        <LinkBox>
        <Icon src={notice_icon}/>
          <MenuText>- 공지사항</MenuText>
        </LinkBox>
        </Link>
      </MenuListContainer>
      <MenuListContainer>
      <Link to={`/introduction` } style={{ textDecoration: "none"}}>
        <LinkBox>
        <Icon src={introduction_icon}/>
          <MenuText>- DailyGram</MenuText>
        </LinkBox>
        </Link>
      </MenuListContainer>
    </Container>
    </>
  )
}

const Container = styled.div`
  position: fixed;
  padding-top: 30px;
  width: 184px;
  height: 100vh;
  box-sizing: border-box;
  @media screen and (max-width: 820px) {
    display: none;
};
`

const Title = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 15px;
`
const MenuListContainer= styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  border-bottom: 0.5px #AAAAAA solid;
  &:hover {
    background-color: rgb(250, 250, 250);
  };
`

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 40px;
`
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`
const MenuText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: black;
`



export default SideBar