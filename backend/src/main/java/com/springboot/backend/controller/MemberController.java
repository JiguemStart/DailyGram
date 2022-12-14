package com.springboot.backend.controller;

import com.springboot.backend.data.dto.*;
import com.springboot.backend.result.LoginResult;
import com.springboot.backend.result.MemberInfoResult;
import com.springboot.backend.result.PasswordChangeResult;
import com.springboot.backend.result.WithdrawalResult;
import com.springboot.backend.service.DiaryService;
import com.springboot.backend.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "회원 컨트롤러")
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final DiaryService diaryService;

    @Autowired
    public MemberController(MemberService memberService, DiaryService diaryService) {
        this.memberService = memberService;
        this.diaryService = diaryService;
    }

    // 회원가입 API
    @ApiOperation(value = "회원가입 API")
    @PostMapping(value = "/register")
    public boolean createMember(@RequestBody MemberDto memberDto) {
        boolean result = false;
        try {
            result = memberService.saveMemberDto(memberDto);
        } catch (Exception e) {
            return false;
        }
        return result;
    }

    // 로그인 API
    @ApiOperation(value = "로그인 API")
    @PostMapping(value = "/login")
    public LoginResult login(@RequestBody LoginDto loginDto) {
        LoginResult result = memberService.login(loginDto.getEmail(), loginDto.getPassword());
        return result;
    }

    // 개인정보조회 API (비밀번호 변경질문 조회)
    @ApiOperation(value = "개인정보조회 (비밀번호 변경질문 조회) API")
    @PostMapping(value = "/view/password-question")
    public MemberInfoResult getPasswordQuestion(@RequestBody TokenDto tokenDto) {

        MemberInfoResult result = diaryService.getPasswordQuestion(tokenDto.getAccessToken(), tokenDto.getRefreshToken());

        return result;
    }

    // 회원탈퇴 API
    @ApiOperation(value = "회원탈퇴 API")
    @DeleteMapping(value = "/withdrawal")
    public WithdrawalResult deleteMember(@RequestBody TokenDto tokenDto) {
        WithdrawalResult result = memberService.deleteMember(tokenDto.getAccessToken(), tokenDto.getRefreshToken());
        return result;
    }

    // 회원가입시 이메일 중복체크 API
    @ApiOperation(value = "회원가입시 이메일 중복체크 API")
    @PostMapping(value = "/duplicate-check")
    public boolean duplicateCheck(@RequestParam String email) {
        boolean result = memberService.duplicateCheck(email);
        return result;
    }

    // 비밀번호 변경 API
    @ApiOperation(value = "비밀번호 변경 API")
    @PostMapping(value = "/change/password")
    public PasswordChangeResult changePassword(@RequestBody ChangePWDto changePWDto) {

        PasswordChangeResult result = memberService.changePassword(changePWDto.getPasswordQuestion(),
                changePWDto.getPasswordAnswer(),
                changePWDto.getNewPassword(),
                changePWDto.getAccessToken(),
                changePWDto.getRefreshToken()
        );

        return result;
    }

    // 이메일로 비밀번호변경질문을 받는 API
    @ApiOperation(value = "이메일로 비밀번호변경질문을 받는 API")
    @PostMapping(value = "/search/question-by-email")
    public String getPasswordQuestionByEmail(@RequestParam String email) {

        String result = diaryService.getPasswordQuestionByEmail(email);

        return result;
    }

    // 비밀번호찾기 API (로그아웃한 상태)
    @ApiOperation(value = "비밀번호찾기 API (로그아웃한 상태)")
    @PostMapping(value = "/search/password")
    public boolean searchPassword(@RequestBody SearchPWDto searchPWDto) {
        boolean result = memberService.searchPassword(searchPWDto.getEmail(), searchPWDto.getPasswordAnswer(), searchPWDto.getNewPassword());

        return result;
    }


}
