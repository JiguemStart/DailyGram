package com.springboot.backend.result;

import lombok.Data;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class ConnectResult<T> {
    private boolean result;
    private String newAccessToken;

    public ConnectResult(boolean result,
                         String newAccessToken) {
        this.result = result;
        this.newAccessToken = newAccessToken;
    }
}