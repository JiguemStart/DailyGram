import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { account_icon, login_icon, logout_icon, logo_icon } from "../assets";
import { useState } from "react";
import MobileSideBar from "./MobileSideBar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../feature/counter/counterSlice";

const HeaderBar = () => {
  const [mobileBarActive, setMobileBarActive] = useState(false)
  
  const navigate = useNavigate()

  const isLogin = useSelector((state) => state.isLogin.value);
  const dispatch = useDispatch()

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

  /**쿠키값 있으면 로그인 유지 */ 
  const loginCheck = () => {
    if(getCookie("refreshToken")) {
      dispatch(login())
    }
  }

  /**로그아웃 요청 */
  const logoutHandler = () => {
    dispatch(logout())
    deleteCookie("accessToken")
    deleteCookie("refreshToken")
    navigate("/main")
  }

  const clickHandler = (id) => {
    if (id == "mobileButton") {
      setMobileBarActive(true)
    }
    else  {
      setMobileBarActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", (e) => clickHandler(e.target.id));
      loginCheck()
  }, []);

  return (
    <>
    <EmptyBox />
      <Container>
        <ContentBox>
          <Button>
          <Link to={`/main` } style={{ textDecoration: "none"}}>
            <LinkBox>
            <Logo>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="48"
                viewBox="0 0 60 60"
                fill="#FFFFFF"
              >
                <path d="M12.4 33q2.7 0 5.225.625 2.525.625 4.975 1.875V14.15q-2.25-1.5-4.875-2.325Q15.1 11 12.4 11q-1.9 0-3.725.475Q6.85 11.95 5 12.65v21.7q1.55-.7 3.525-1.025Q10.5 33 12.4 33Zm13.2 2.5q2.5-1.25 4.9-1.875Q32.9 33 35.6 33q1.9 0 3.925.3t3.475.8V12.65q-1.7-.85-3.6-1.25-1.9-.4-3.8-.4-2.7 0-5.225.825-2.525.825-4.775 2.325ZM24.1 40q-2.55-1.9-5.55-2.925T12.4 36.05q-1.85 0-3.6.45t-3.5 1.1q-1.15.55-2.225-.15Q2 36.75 2 35.45V12.3q0-.75.35-1.375T3.4 9.95q2.1-1 4.375-1.475Q10.05 8 12.4 8q3.15 0 6.125.85t5.575 2.6q2.55-1.75 5.475-2.6Q32.5 8 35.6 8q2.35 0 4.6.475 2.25.475 4.35 1.475.7.35 1.075.975T46 12.3v23.15q0 1.4-1.125 2.125-1.125.725-2.225.025-1.7-.7-3.45-1.125-1.75-.425-3.6-.425-3.15 0-6.05 1.05T24.1 40ZM13.8 23.55Z" />
              </svg>
            </Logo>
            <ButtonText>DailyGram</ButtonText>
            </LinkBox>
            </Link>
          </Button>
          <Button isLogin={isLogin}>
              <Link to={`/login` } style={{ textDecoration: "none"}}>
                <LinkBox>
            <Icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 -13 60 60"
                fill="#FFFFFF"
              >
                <path d="M24.45 42v-3H39V9H24.45V6H39q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm-3.9-9.25L18.4 30.6l5.1-5.1H6v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z" />
              </svg>
            </Icon>
            <ButtonText>로그인</ButtonText>
            </LinkBox>
            </Link>
          </Button>
          <Button isLogin={isLogin}>
          <Link to={`/account` } style={{ textDecoration: "none"}}>
            <LinkBox>
            <Icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 -13 60 60"
                fill="#FFFFFF"
              >
                <path d="M24 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM8 40v-4.7q0-1.9.95-3.25T11.4 30q3.35-1.5 6.425-2.25Q20.9 27 24 27q3.1 0 6.15.775 3.05.775 6.4 2.225 1.55.7 2.5 2.05.95 1.35.95 3.25V40Zm3-3h26v-1.7q0-.8-.475-1.525-.475-.725-1.175-1.075-3.2-1.55-5.85-2.125Q26.85 30 24 30t-5.55.575q-2.7.575-5.85 2.125-.7.35-1.15 1.075Q11 34.5 11 35.3Zm13-16.05q1.95 0 3.225-1.275Q28.5 18.4 28.5 16.45q0-1.95-1.275-3.225Q25.95 11.95 24 11.95q-1.95 0-3.225 1.275Q19.5 14.5 19.5 16.45q0 1.95 1.275 3.225Q22.05 20.95 24 20.95Zm0-4.5ZM24 37Z" />
              </svg>
            </Icon>
            <ButtonText>계정</ButtonText>
            </LinkBox>
            </Link>
          </Button>
          <Button isLogin={isLogin}>
          <Link to={`/main` } style={{ textDecoration: "none"}}>
            <LinkBox>
            <Icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 -13 60 60"
                fill="#FFFFFF"
              >
                <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z" />
              </svg>
            </Icon>
            <ButtonText onClick={()=>logoutHandler()}>로그아웃</ButtonText>
            </LinkBox>
            </Link>
          </Button>
          <Button id="mobileButton" >
            <Icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 -13 60 60"
                fill="#FFFFFF"
              >
                <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
              </svg>
            </Icon>
          </Button>
        </ContentBox>
      </Container>
      <MobileSideBar state={mobileBarActive}/>
    </>
  );
};

const EmptyBox = styled.div`

  height: 50px;
`

const Container = styled.header`
  z-index: 1;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #3f51b5;
`;

const ContentBox = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: right;
  width: 1200px;
  height: 50px;
  @media screen and (max-width: 1200px) {
    width: 100%;
};
`;
const Button = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
  &:nth-of-type(1) {
    position: absolute;
    left: 20px;
    width: 150px;
    font-size: 18px;
  }
  &:nth-of-type(2) {
    display: ${(props) => {
      return props.isLogin == false ? "flex" : "none";
    }};
    @media screen and (max-width: 820px) {
      display: none;
  };
  }
  &:nth-of-type(3) {
    display: ${(props) => {
      return props.isLogin == false ? "none" : "flex";
    }};
    @media screen and (max-width: 820px) {
      display: none;
  };
  }
  &:nth-of-type(4) {
    display: ${(props) => {
      return props.isLogin == false ? "none" : "flex";
    }};
    @media screen and (max-width: 820px) {
      display: none;
  };
  };
  &:nth-of-type(5) {
    display: none;
    @media screen and (max-width: 820px) {
      display: flex;
  };
  cursor: pointer;
`;

const LinkBox = styled.div`
display: flex;
align-items: center;
`
const Logo = styled.div`
  wdith: 40px;
  height: 40px;
`;
const ButtonText = styled.div`
  color: #ffffff;
`;
const Icon = styled.div`
pointer-events: none;
  wdith: 40px;
  height: 40px;
`;

export default HeaderBar;
