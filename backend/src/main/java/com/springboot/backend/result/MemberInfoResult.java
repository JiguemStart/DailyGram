package com.springboot.backend.result;

import lombok.Data;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class MemberInfoResult<T> {
    private boolean tokenResult;
    private String newAccessToken;
    private String passwordQuestion;

    public MemberInfoResult(boolean tokenResult,
                            String newAccessToken,
                            String passwordQuestion) {
        this.tokenResult = tokenResult;
        this.newAccessToken = newAccessToken;
        this.passwordQuestion = passwordQuestion;
    }
}