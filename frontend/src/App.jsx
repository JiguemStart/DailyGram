import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import {
  AccountPage,
  DairyListPage,
  DiaryDetailPage,
  DiaryWritePage,
  FindPasswordPage,
  IntroductionPage,
  LoginPage,
  MainPage,
  NoticePage,
  SignupPage,
} from "./pages";
import { FooterBar, HeaderBar, SideBar } from "./components";

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
v2.0 | 20110126
License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
display: block;
}
body {
line-height: 1;
}
ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: '';
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}
 
 
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <HeaderBar />
        <SideBar />
        <Routes>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/diaryList" element={<DairyListPage />} />
          <Route path="/diaryDetail" element={<DiaryDetailPage />} />
          <Route path="/diaryWrite" element={<DiaryWritePage />} />
          <Route path="/findPassword" element={<FindPasswordPage />} />
          <Route path="/Introduction" element={<IntroductionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
        <FooterBar />
      </BrowserRouter>
    </>
  );
}

export default App;
