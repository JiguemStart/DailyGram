package com.springboot.backend.result;

import lombok.Data;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class PasswordChangeResult<T> {
    private boolean tokenResult;
    private String newAccessToken;
    private boolean changeResult;

    public PasswordChangeResult(boolean tokenResult,
                                String newAccessToken,
                                boolean changeResult) {
        this.tokenResult = tokenResult;
        this.newAccessToken = newAccessToken;
        this.changeResult = changeResult;
    }
}