package com.springboot.backend.data.dto;

import lombok.Getter;

@Getter
public class DiaryDetailDto {

    private String accessToken;
    private String refreshToken;
    private Long id;
}
