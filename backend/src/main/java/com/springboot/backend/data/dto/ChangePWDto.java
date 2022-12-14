package com.springboot.backend.data.dto;

import lombok.Getter;

@Getter
public class ChangePWDto {

    private String accessToken;
    private String refreshToken;
    private String newPassword;
    private String passwordAnswer;
    private String passwordQuestion;
}
