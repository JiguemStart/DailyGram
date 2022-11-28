import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { notice_icon, introduction_icon, account_icon, logout_icon } from '../assets'

const MobileSideBar = (props) => {

  return (
    <>
      <Container state={props.state}>
      <MenuListContainer>
      <Link to={`/account` } style={{ textDecoration: "none"}}>
        <LinkBox>
          <Icon src={account_icon}/>
          <MenuText>- 계정</MenuText>
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
      <MenuListContainer>
      <Link to={`/introduction` } style={{ textDecoration: "none"}}>
        <LinkBox>
        <Icon src={logout_icon}/>
          <MenuText>- 로그아웃</MenuText>
        </LinkBox>
        </Link>
      </MenuListContainer>

      </Container>
    </>
  )
}

const Container = styled.div`
display: none;
  visibility: ${(props) => {
    return props.state == true ? "visibility" : "hidden"
  }};
  position: fixed;
  width: 135px;
  top: 40px;
  right: 15px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
    @media screen and (max-width: 820px) {
      display: block;
  };
`


const MenuListContainer= styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 56px;
  &:hover {
    background-color: rgb(250, 250, 250);
  };
  &:nth-of-type(1) {
    border-radius: 10px 10px 0 0;
  }
  &:nth-of-type(4) {
    border-radius: 0 0 10px 10px;
    border-top: 0.5px #AAAAAA solid; 
  }
`

const LinkBox = styled.div`
  display: flex;
  align-items: center;
`
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`
const MenuText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: black;
`

export default MobileSideBar