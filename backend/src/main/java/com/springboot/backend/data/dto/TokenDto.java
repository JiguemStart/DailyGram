package com.springboot.backend.data.dto;

import lombok.*;

@Getter
public class TokenDto {

    private String accessToken;
    private String refreshToken;
}
