package com.springboot.backend.controller;

import com.springboot.backend.data.dto.DiaryDto;
import com.springboot.backend.data.dto.DiaryResponseDto;
import com.springboot.backend.data.dto.MemberDto;
import com.springboot.backend.data.dto.MemberResponseDto;
import com.springboot.backend.result.ConnectResult;
import com.springboot.backend.result.LoginResult;
import com.springboot.backend.service.DiaryService;
import com.springboot.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MainController {

    private final MemberService memberService;
    private final DiaryService diaryService;

    @Autowired
    public MainController(MemberService memberService, DiaryService diaryService) {
        this.memberService = memberService;
        this.diaryService = diaryService;
    }

    // 회원가입 API
    @PostMapping(value = "/register")
    public ResponseEntity<MemberResponseDto> createMember(@RequestBody MemberDto memberDto) {
        MemberResponseDto memberResponseDto = memberService.saveMemberDto(memberDto);
        return ResponseEntity.status(HttpStatus.OK).body(memberResponseDto);
    }

    // 로그인 API
    @PostMapping(value = "/login")
    public LoginResult login(String email, String password) {
        LoginResult result = memberService.login(email, password);
        return result;
    }

    // 접속 API
    @PostMapping(value = "/connect")
    public ConnectResult connect(@RequestParam(value = "accessToken") String accessToken,
                                 @RequestParam(value = "refreshToken") String refreshToken) {
        ConnectResult result = diaryService.confrimToken(accessToken, refreshToken);
        return result;
    }

    // 일기작성 API
    @PostMapping(value = "/diary/write")
    public boolean writeDiary(@RequestBody DiaryDto diaryDto) {
        boolean result = false;
        result = diaryService.createDiary(diaryDto);

        return result;
    }

    // 일기목록 가져오기 (최신목록순으로 10개씩)
    @GetMapping(value = "/viewpaging")
    public List<DiaryResponseDto> getDiaryList(@RequestParam(value = "email") String email,
                                            @RequestParam(value = "page") Integer page) {

        if (page == null) {
            page = 1;
        }

        List<DiaryResponseDto> diaryResponseDtos
                = diaryService.getDiaryList(email, page);

        return diaryResponseDtos;
    }

    // 일기 Detail 페이지 보기
    @GetMapping(value = "/view/detail")
    public DiaryResponseDto getDiaryDetail(@RequestParam(value = "일기고유번호") Long diaryNum) {
        DiaryResponseDto diaryResponseDto = diaryService.getDiaryDetail(diaryNum);

        return diaryResponseDto;
    }

    // 일기 전체갯수 반환
    @GetMapping(value = "/view/diary-num")
    public Integer getDiaryNum(@RequestParam(value = "이메일") String email) {
        Integer diaryNum = diaryService.getDiaryNum(email);
        return diaryNum;
    }

    // 일기삭제 API
    @DeleteMapping(value = "/diary/delete")
    public boolean deleteDiary(@RequestBody Long diaryId) {
        boolean result = diaryService.deleteDiary(diaryId);
        return result;
    }
}
