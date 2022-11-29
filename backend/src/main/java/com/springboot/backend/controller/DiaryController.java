package com.springboot.backend.controller;

import com.springboot.backend.data.dto.DiaryDto;
import com.springboot.backend.result.*;
import com.springboot.backend.service.DiaryService;
import com.springboot.backend.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Api(value = "일기 컨트롤러")
@RestController
@RequestMapping("/diary")
public class DiaryController {


    private final DiaryService diaryService;

    @Autowired
    public DiaryController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    // 일기작성 API
    @ApiOperation(value = "일기작성 API")
    @PostMapping(value = "/write")
    public ConnectResult writeDiary(@RequestBody DiaryDto diaryDto,
                              @RequestParam(value = "accessToken") String accessToken,
                              @RequestParam(value = "refreshToken") String refreshToken) {
        ConnectResult result = diaryService.createDiary(diaryDto, accessToken, refreshToken);

        return result;
    } // 일기정보랑 토큰을 주면, 일기작성이 되어야지

    // 일기목록 가져오기 (최신목록순으로 10개씩)
    @ApiOperation(value = "일기목록 가져오기 (최신순 12개씩 API)", notes = "page는 안넣으면 1페이지로 조회된다")
    @GetMapping(value = "/view/list")
    public DairyListResult getDiaryList(@RequestParam(value = "accessToken") String accessToken,
                                        @RequestParam(value = "refreshToken") String refreshToken,
                                        @RequestParam(required = false, value = "page") Integer page) {

        if (page == null) {
            page = 1;
        }

        DairyListResult result
                = diaryService.getDiaryList(accessToken, refreshToken, page);

        return result;
    }

    // 일기 Detail 페이지 보기
    @ApiOperation(value = "일기 상세페이지 보기 API")
    @GetMapping(value = "/view/detail")
    public DairyDetailResult getDiaryDetail(@RequestParam(value = "일기고유번호") Long diaryNum,
                                            @RequestParam(value = "accessToken") String accessToken,
                                            @RequestParam(value = "refreshToken") String refreshToken) {
        DairyDetailResult result = diaryService.getDiaryDetail(diaryNum, accessToken, refreshToken);

        return result;
    }

    // 일기 전체갯수 반환
    @ApiOperation(value = "일기 전체갯수 반환 API")
    @GetMapping(value = "/view/diary-num")
    public DairyNumResult getDiaryNum(@RequestParam(value = "accessToken") String accessToken,
                                      @RequestParam(value = "refreshToken") String refreshToken) {
        DairyNumResult result = diaryService.getDiaryNum(accessToken, refreshToken);
        return result;
    }

    // 일기삭제 API
    @ApiOperation(value = "일기 삭제 API")
    @DeleteMapping(value = "/delete")
    public DairyDeleteResult deleteDiary(@RequestBody Long diaryId,
                                         @RequestParam(value = "accessToken") String accessToken,
                                         @RequestParam(value = "refreshToken") String refreshToken) {
        DairyDeleteResult result = diaryService.deleteDiary(diaryId, accessToken, refreshToken);
        return result;
    }


}
