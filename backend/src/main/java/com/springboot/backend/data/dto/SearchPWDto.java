package com.springboot.backend.data.dto;

import lombok.Getter;

@Getter
public class SearchPWDto {

    private String email;
    private String newPassword;
    private String passwordAnswer;
}
