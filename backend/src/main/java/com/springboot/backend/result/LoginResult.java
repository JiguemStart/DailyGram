package com.springboot.backend.result;

import lombok.Data;

import java.util.Map;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class LoginResult<T> {
    private boolean result;
    private String explanation;
    private String accessToken;
    private String refreshToken;

    public LoginResult(boolean result,
                       String explanation,
                       String accessToken,
                       String refreshToken) {
        this.result = result;
        this.explanation = explanation;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}