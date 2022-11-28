package com.springboot.backend.service;

import com.springboot.backend.data.dto.DiaryDto;
import com.springboot.backend.data.dto.DiaryResponseDto;
import com.springboot.backend.result.ConnectResult;

import java.util.List;

public interface DiaryService {
    ConnectResult confrimToken(String accessToken, String refreshToken);

    boolean createDiary(DiaryDto diaryDto);

    List<DiaryResponseDto> getDiaryList(String email, Integer page);

    DiaryResponseDto getDiaryDetail(Long diaryNum);

    Integer getDiaryNum(String email);

    boolean deleteDiary(Long diaryId);
}
