package com.springboot.backend.service;

import com.springboot.backend.data.dto.MemberDto;
import com.springboot.backend.data.dto.MemberResponseDto;
import com.springboot.backend.result.LoginResult;
import com.springboot.backend.result.PasswordChangeResult;
import com.springboot.backend.result.WithdrawalResult;


public interface MemberService {
    MemberResponseDto saveMemberDto(MemberDto memberDto);

    LoginResult login(String email, String password);

    WithdrawalResult deleteMember(String accessToken, String refreshToken);

    boolean duplicateCheck(String email);

    PasswordChangeResult changePassword(String passwordQuestion, String passwordAnswer, String newPassword, String accessToken, String refreshToken);

    boolean searchPassword(String email, String passwordAnswer, String newPassword);
}
