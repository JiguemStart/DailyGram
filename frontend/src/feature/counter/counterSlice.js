import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "isLogin",
  initialState: {
    value: false,
  },
  reducers: {
    login: (state) => {
      console.log("로그인 상태")
      state.value = true
    },
    logout: (state) => {
      console.log("로그아웃 상태")
      state.value = false
    },
  }
})

export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
