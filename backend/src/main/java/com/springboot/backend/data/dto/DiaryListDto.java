package com.springboot.backend.data.dto;

import lombok.Getter;

@Getter
public class DiaryListDto {

    private String accessToken;
    private String refreshToken;
    private Integer page;
}
