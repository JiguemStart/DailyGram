import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { write_icon, list_icon } from "../assets";

const FooterBar = () => {
  return (
    <>
      <Container>
        <MenuListContainer>
          <Link to={`/diaryWrite`} style={{ textDecoration: "none" }}>
            <LinkBox>
              <Icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 -13 60 60"
                  fill="#FFFFFF"
                >
                  <path d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z" />
                </svg>
              </Icon>
              <MenuText>- 일기작성</MenuText>
            </LinkBox>
          </Link>
        </MenuListContainer>
        <MenuListContainer>
          <Link to={`/diaryList`} style={{ textDecoration: "none" }}>
            <LinkBox>
              <Icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 -13 60 60"
                  fill="#FFFFFF"
                >
                  <path d="M15 33.7q.6 0 1.05-.45.45-.45.45-1.05 0-.6-.45-1.05-.45-.45-1.05-.45-.6 0-1.05.45-.45.45-.45 1.05 0 .6.45 1.05.45.45 1.05.45Zm0-8.2q.6 0 1.05-.45.45-.45.45-1.05 0-.6-.45-1.05-.45-.45-1.05-.45-.6 0-1.05.45-.45.45-.45 1.05 0 .6.45 1.05.45.45 1.05.45Zm0-8.2q.6 0 1.05-.45.45-.45.45-1.05 0-.6-.45-1.05-.45-.45-1.05-.45-.6 0-1.05.45-.45.45-.45 1.05 0 .6.45 1.05.45.45 1.05.45Zm6.6 16.4h12.2v-3H21.6Zm0-8.2h12.2v-3H21.6Zm0-8.2h12.2v-3H21.6ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z" />
                </svg>
              </Icon>
              <MenuText>- 일기목록</MenuText>
            </LinkBox>
          </Link>
        </MenuListContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: none;
  width: 100vw;
  height: 50px;
  background-color: #3f51b5;
  @media screen and (max-width: 820px) {
    display: flex;
};
`;
const MenuListContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
`;
const LinkBox = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.div`
  width: 27px;
  height: 40px;
`;
const MenuText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

export default FooterBar;
