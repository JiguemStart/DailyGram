package com.springboot.backend.result;

import lombok.Data;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class ConnectResult<T> {
    private boolean tokenResult;
    private String newAccessToken;
    private String email;

    public ConnectResult(boolean tokenResult,
                         String newAccessToken,
                         String email) {
        this.tokenResult = tokenResult;
        this.newAccessToken = newAccessToken;
        this.email = email;
    }
}