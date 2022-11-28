import React from 'react'
import styled from 'styled-components'

const NoticePage = () => {
  return (
    <>
    <Container>
      <Title>공지사항</Title>
      <NoticeListBox>
        <Date>2022.12.02</Date>
        <NoticeText>DailyGram이 런칭하였습니다.</NoticeText>
      </NoticeListBox>

    </Container>
    </>
  )
}

const Container = styled.div`
  padding-top: 10px;
`
const Title = styled.div`
  margin: 0 auto;
  margin-bottom: 25px;
  width: 200px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`
const NoticeListBox = styled.div`
  display: flex;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
box-sizing: border-box;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
}
  font-weight: 600;
`
const Date = styled.div`
  margin-right: 30px;
`
const NoticeText = styled.div`

`

export default NoticePage