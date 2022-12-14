package com.springboot.backend.service;

import com.springboot.backend.data.dto.DiaryDto;
import com.springboot.backend.data.dto.DiaryResponseDto;
import com.springboot.backend.result.*;

import java.util.List;

public interface DiaryService {
//    ConnectResult confrimToken(String accessToken, String refreshToken);

    DairyListResult getDiaryList(String accessToken, String refreshToken, Integer page);

    DairyDetailResult getDiaryDetail(Long diaryNum, String accessToken, String refreshToken);

    DairyNumResult getDiaryNum(String accessToken, String refreshToken);

    DairyDeleteResult deleteDiary(Long diaryId,String accessToken, String refreshToken);

    MemberInfoResult getPasswordQuestion(String accessToken, String refreshToken);

    ConnectResult createDiary(DiaryDto diaryDto, String accessToken, String refreshToken);

    String getPasswordQuestionByEmail(String email);
}
