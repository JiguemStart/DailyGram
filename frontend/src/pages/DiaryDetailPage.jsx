import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const DiaryDetailPage = () => {
  const [diary, setDiary] = useState([]);

  const location = useLocation();

  /** 일기목록 조회 api */
  const diaryDetailRequest = async () => {
    await axios
      .post(`http://localhost:8080/diary/view/detail`, {
        accessToken: getCookie("accessToken"),
        id: parseInt(location.pathname.split("/")[2]),
        refreshToken: getCookie("refreshToken"),
      })
      .then((res) => {
        setDiary(res.data.diaryResponseDto);
      })
      .catch((error) => {
        alert("요청에 실패하였습니다.");
        console.log(error);
      });
  };

  /**쿠키값 얻기 */
  function getCookie(name) {
    var i,
      x,
      y,
      ARRcookies = document.cookie.split(";");

    for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);

      x = x.replace(/^\s+|\s+$/g, "");

      if (x == name) {
        return unescape(y);
      }
    }
  }

  useEffect(() => {
    diaryDetailRequest();
  }, []);

  return (
    <>
      <Card>
        <Box>
          <Date>{diary.date}</Date>
          <Weahter>날씨 : {diary.weather}</Weahter>
          <Feel>기분 : {diary.feeling}</Feel>
        </Box>
        <Title>{diary.content}</Title>
        <Content>{diary.content}</Content>
      </Card>
    </>
  );
};

const Card = styled.div`
  position: relative;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 25px;

  position: relative;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  };
  @media screen and (max-width: 599px) {
    width: 100%;
  }
`;

const Title = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  padding-right: 20px;
  font-size: 24px;
  font-weight: 700;
  white-space: nowrap;

  text-overflow: ellipsis;

  overflow: hidden;
`;
const Content = styled.div`
  line-height: 21px;
  min-height: 210px;
  margin-top: 1px;
  word-break: break-all;
`;

const Box = styled.div`
  font-size: 16px;
`;
const Date = styled.span`
  margin-right: 10px;
`;
const Weahter = styled.span`
  position: absolute;
  right: 15px;
  margin-right: 5px;
`;
const Feel = styled.span`
  position: absolute;
  right: 100px;
`;

export default DiaryDetailPage;
