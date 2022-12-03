import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DairyListPage = () => {
  const [list, setList] = useState([]);
  const [pageList, setPageList] = useState([]);

  const navigate = useNavigate();

  /** 일기목록 조회 api */
  const listRequest = async (num) => {
    await axios
      .post(`http://localhost:8080/diary/view/list`, {
        accessToken: getCookie("accessToken"),
        page: num,
        refreshToken: getCookie("refreshToken"),
      })
      .then((res) => {
        setList(res.data.diaryResponseDtos);
      })
      .catch((error) => {
        alert("요청에 실패하였습니다.");
        console.log(error);
      });
  };

  /** 일기 목록 조회 api */
  const listCountReqeust = async () => {
    await axios
      .post(`http://localhost:8080/diary/view/diary-num`, {
        accessToken: getCookie("accessToken"),
        refreshToken: getCookie("refreshToken"),
      })
      .then((res) => {
        let arr = [];
        let pageCount = parseInt(res.data.num / 12);
        for (let i = 0; i <= pageCount; i++) {
          arr.push(i);
        }
        setPageList([...arr]);
      })
      .catch((error) => {
        alert("요청에 실패하였습니다.");
        console.log(error);
      });
  };

  /** 일기 삭제 요청 api */
  const deleteDiaryRequest = (id) => {
    axios({
      method: "delete", // [요청 타입]
      url: "http://localhost:8080/diary/delete", // [요청 주소]
      data: {
        accessToken: getCookie("accessToken"),
        id: id,
        refresToken: getCookie("refreshToken"),
      }, // [요청 데이터]
    })
      .then(function (response) {
        alert("삭제되었습니다.")
        window.location.reload()
      })
      .catch(function (error) {
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
    listRequest(1);
    listCountReqeust();
  }, []);
  return (
    <>
      <Container>
        {list.length > 0
          ? list.map((i) => {
              return (
                <Card key={i.id}>
                  <Button onClick={() => deleteDiaryRequest(i.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="25"
                      width="25"
                      viewBox="0 -7 60 60"
                    >
                      <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
                    </svg>
                  </Button>
                  <Title onClick={() => navigate(`/diaryDetail/${i.id}`)}>
                    {i.title}
                  </Title>
                  <Content onClick={() => navigate(`/diaryDetail/${i.id}`)}>
                    &nbsp;{i.content}
                  </Content>
                  <Box>
                    <Date>{i.date}</Date>
                    <Weahter>{i.weather}</Weahter>
                    <Feel>{i.feeling}</Feel>
                  </Box>
                </Card>
              );
            })
          : "작성된 일기가 없습니다."}
      </Container>
      {list.length > 0 ? 
      <PageNumContainer>
        {pageList
          ? pageList.map((i) => {
              return (
                <PageNum key={i + "num"} onClick={() => listRequest()}>
                  {i + 1}
                </PageNum>
              );
            })
          : ""}
      </PageNumContainer>
      : "" }
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 25px;

  position: relative;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
  width: 240px;
  height: 300px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  };
  @media screen and (max-width: 599px) {
    width: 100%;
  }
`;

const Button = styled.div`
  position: absolute;
  top: 8px;
  right: 20px;
  width: 10px;
  height: 10px;
  cursor: pointer;
`;

const Title = styled.div`
  margin-bottom: 10px;
  padding-right: 20px;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;

  text-overflow: ellipsis;

  overflow: hidden;
  cursor: pointer;
`;
const Content = styled.div`
  line-height: 21px;
  height: 210px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
  margin-top: 1px;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  cursor: pointer;
`;
const Box = styled.div`
  position: absolute;
  bottom: 15px;
  font-size: 14px;
`;
const Date = styled.span`
  margin-right: 10px;
`;
const Weahter = styled.span`
  margin-right: 5px;
`;
const Feel = styled.span``;

const PageNumContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PageNum = styled.div`
  width: 30px;
  margin-right: 15px;
  cursor: pointer;
`;

export default DairyListPage;
