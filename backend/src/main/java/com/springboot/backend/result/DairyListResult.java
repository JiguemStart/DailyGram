package com.springboot.backend.result;

import com.springboot.backend.data.dto.DiaryResponseDto;
import lombok.Data;

import java.util.List;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class DairyListResult<T> {
    private boolean tokenResult;
    private String newAccessToken;
    private List<DiaryResponseDto> diaryResponseDtos;

    public DairyListResult(boolean tokenResult,
                           String newAccessToken,
                           List<DiaryResponseDto> diaryResponseDtos) {
        this.tokenResult = tokenResult;
        this.newAccessToken = newAccessToken;
        this.diaryResponseDtos = diaryResponseDtos;
    }
}