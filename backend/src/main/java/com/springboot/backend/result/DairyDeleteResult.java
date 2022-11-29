package com.springboot.backend.result;

import lombok.Data;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class DairyDeleteResult<T> {
    private boolean tokenResult;
    private String newAccessToken;
    private boolean deleteResult;

    public DairyDeleteResult(boolean tokenResult,
                             String newAccessToken,
                             boolean deleteResult) {
        this.tokenResult = tokenResult;
        this.newAccessToken = newAccessToken;
        this.deleteResult = deleteResult;
    }
}