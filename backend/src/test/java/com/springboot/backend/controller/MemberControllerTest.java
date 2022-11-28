package com.springboot.backend.controller;

import com.google.gson.Gson;
import com.springboot.backend.data.dto.MemberDto;
import com.springboot.backend.data.dto.MemberResponseDto;
import com.springboot.backend.service.impl.MemberServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest
public class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    MemberServiceImpl memberService;

    @Test
    @DisplayName("MockMvc를 통한 회원가입 테스트")
    void createMemberTest() throws Exception {


        // given : Mock 객체가 특정 상황에서 해야하는 행위를 정의하는 메소드
//        given(memberService.saveMemberDto(new MemberDto("asdf@naver.com","mypassword","내보물1호는?","고양이")))
//                .willReturn(new MemberResponseDto(1L,"asdf@naver.com","mypassword","내보물1호는?","고양이"));

        MemberDto memberDto = MemberDto.builder()
                .email("asdf@naver.com")
                .password("mypassword")
                .passwordQuestion("내보물1호는?")
                .passwordAnswer("고양이")
                .build();

        Gson gson = new Gson();
        String content = gson.toJson(memberDto);


        // andExpect : 기대하는 값이 나왔는지 체크해볼 수 있는 메소드
        mockMvc.perform(
                post("/register")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.email").exists())
                .andExpect(jsonPath("$.password").exists())
                .andExpect(jsonPath("$.passwordQuestion").exists())
                .andExpect(jsonPath("$.passwordAnswer").exists())
                .andDo(print());

        // verify : 해당 객체의 메소드가 실행 되었는지 체크해줌
            verify(memberService)
                    .saveMemberDto(new MemberDto("asdf@naver.com","mypassword","내보물1호는?","고양이"));


    }

}
