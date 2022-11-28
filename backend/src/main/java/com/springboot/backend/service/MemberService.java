package com.springboot.backend.service;

import com.springboot.backend.data.dto.MemberDto;
import com.springboot.backend.data.dto.MemberResponseDto;
import com.springboot.backend.result.LoginResult;

public interface MemberService {
    MemberResponseDto saveMemberDto(MemberDto memberDto);

    LoginResult login(String email, String password);
}
