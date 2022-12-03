import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import axios from "axios";

const DiaryWritePage = () => {
  const [titleActive, setTitleActive] = useState(false)
  const [contentActive, setContentActive] = useState(false)

  const [dateAble, setDateAble] = useState(1)


  const [dateY, setDateY] = useState(""); // 년
  const [dateM, setDateM] = useState(""); // 월
  const [dateD, setDateD] = useState(""); // 일
  const [weather, setWeather] = useState("맑음")
  const [feel, setFeel] = useState("행복")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const isLogin = useSelector((state) => state.isLogin.value);
  const dispatch = useDispatch()

  const navigate = useNavigate()



  const day = dayjs();

      /** 일기작성 요청 api */
      const writeRequest = async () => {
        if(dateY.length == 4 && dateM.length > 0 && dateD.length > 0 && dateD < 32 && dateD > 0 && title.length > 0 && content.length > 0)
        
        {
        await axios
          .post(`http://localhost:8080/diary/write`, {
            accessToken: getCookie("accessToken"),
            content: content,
            date: dateY + "년" +dateM + "월" + dateD + "일",
            feeling: feel,
            refreshToken: getCookie("refreshToken"),
            title: title,
            weather: weather
              })
          .then(res => {
            if(res.data.tokenResult == true) {
              navigate("/diaryList")
            }
            else {
              alert("다시 로그인해 주세요.")
              navigate("/main")
            }
          })
          .catch(error => {
            alert("요청에 실패하였습니다.")
            console.log(error);
          })
        }
      };

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

  /**날짜 유효성 확인 */
  const dateCheckHandler = () => {

    if(dateY.length == 4 && dateM.length > 0 && dateD.length > 0 && dateD < 32 && dateD > 0) {
      setDateAble(1)
    }
    else {
      setDateAble(0)
    }
  }


useEffect(() => {
  dateCheckHandler()
}, [dateY, dateM, dateD])


  useEffect(() => {
    setDateY(day.format("YYYY"))
    setDateM(day.format("M"))
    setDateD(day.format("D"))
    isLogin ? "" : navigate("/main")
  }, [])

  return (
    <>
      <Container>
        <InputContainer>
          <DateText able={dateAble}>날짜</DateText>
          <DateInput
  
          defaultValue={day.format("YYYY")}
            maxLength="4"
            onChange={(e) => setDateY(e.target.value)}
          />
          .
          <DateInput
            defaultValue={day.format("M")}
            maxLength="2"
            onChange={(e) => setDateM(e.target.value)}
          />
          .
          <DateInput
            defaultValue={day.format("D")}
            maxLength="2"
            onChange={(e) => setDateD(e.target.value)}
          />
          .
          <Line able={dateAble}/>
        </InputContainer>
        <InputContainer>
          <WeatherText >
            날씨
          </WeatherText>
          <Select
            id="weather"
            onChange={(e) => setWeather(e.target.value)}
          >
            <option value="맑음">맑음</option>
            <option value="선선">선선</option>
            <option value="흐림">흐림</option>
            <option value="비">비</option>
            <option value="눈">눈</option>
            <option value="바람">바람</option>
            <option value="폭풍">폭풍</option>
            <option value="안개">안개</option>
            <option value="쌀쌀">쌀쌀</option>
            <option value="더움">더움</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <WeatherText >
            기분
          </WeatherText>
          <Select
            id="feel"
            onChange={(e) => setFeel(e.target.value)}
          >
            <option value="행복">행복</option>
            <option value="사랑">사랑</option>
            <option value="상쾌">상쾌</option>
            <option value="설램">설램</option>
            <option value="황홀">황홀</option>
            <option value="긴장">긴장</option>
            <option value="슬픔">슬픔</option>
            <option value="화남">화남</option>
            <option value="우울">우울</option>
            <option value="그냥">그냥</option>
            <option value="그리움">그리움</option>
            <option value="이별">이별</option>
            <option value="울음">울음</option>
            <option value="고독">고독</option>
            <option value="답답">답답</option>
            <option value="힘든">힘든</option>
            <option value="바쁨">바쁨</option>
            <option value="피곤">피곤</option>
            <option value="아픔">아픔</option>
            <option value="불안">불안</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <InputText state={titleActive}>
            일기 제목
          </InputText>
          <TitleInput
            id="title"
            onFocus={()=>setTitleActive(true)}
            onBlur={()=>title ? setTitleActive(true) : setTitleActive(false)}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputText state={contentActive}>
            일기 내용
          </InputText>
          <TextArea
            id="content"
            onFocus={()=>setContentActive(true)}
            onBlur={()=>content ? setContentActive(true) : setContentActive(false)}
            onChange={(e) => setContent(e.target.value)}
          />
        </InputContainer>

        <SaveButton onClick={()=>writeRequest()}
        >
          일기 저장
        </SaveButton>
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
  max-width: 900px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  };
  
`;
const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-top: 5px;
`;

const DateText = styled.div`
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 600;
  pointer-events: none;
  color: #aaaaaa;
  color: ${(props) => {
    return props.able == 0 ? "red" : "";
  }};
`;
const WeatherText = styled.div`
  position: absolute;
  top: 0;
  font-size: 12px;
  font-weight: 600;
  pointer-events: none;
  color: #aaaaaa;
`;
const DateInput = styled.input`
  width: 40px;
  font-size: 16px;
  &:nth-of-type(2) {
    width: 20px;
  }
  &:nth-of-type(3) {
    width: 20px;
  }
  border: none;
`;
const Line = styled.div`
  height: 5px;
  border-bottom: 1px solid #aaaaaa;
  border-bottom: ${(props) => {
    return props.able == 0 ? "2px solid red" : "";
  }};
  border-bottom: ${(props) => {
    return props.able == 1 ? "1px solid #bbbbbb" : "";
  }};
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
const Select = styled.select`
  padding: 0;
  display: block;

  width: 100%;
  height: 40px;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-bottom: 1px solid #bbbbbb;
  font-size: 16px;
`;
const TitleInput = styled.input`
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
const SaveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  border-radius: 5px;
  color:  #FFFFFF;
  background-color: #3f51b5;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  padding: 0;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 400px;
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

export default DiaryWritePage;
