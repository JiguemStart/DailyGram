package com.springboot.backend.result;

import lombok.Data;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class DairyNumResult<T> {
    private boolean tokenResult;
    private String newAccessToken;
    private Integer num;

    public DairyNumResult(boolean tokenResult,
                          String newAccessToken,
                          Integer num) {
        this.tokenResult = tokenResult;
        this.newAccessToken = newAccessToken;
        this.num = num;
    }
}