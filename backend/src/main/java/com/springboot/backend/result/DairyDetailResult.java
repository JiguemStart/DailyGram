package com.springboot.backend.result;

import com.springboot.backend.data.dto.DiaryResponseDto;
import lombok.Data;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class DairyDetailResult<T> {
    private boolean tokenResult;
    private String newAccessToken;
    private DiaryResponseDto diaryResponseDto;

    public DairyDetailResult(boolean tokenResult,
                             String newAccessToken,
                             DiaryResponseDto diaryResponseDto) {
        this.tokenResult = tokenResult;
        this.newAccessToken = newAccessToken;
        this.diaryResponseDto = diaryResponseDto;
    }
}