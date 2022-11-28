package com.springboot.backend.result;

import lombok.Data;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class DairyResult<T> {
    private boolean result;
    private String email;

    public DairyResult(boolean result,
                       String email) {
        this.result = result;
        this.email = email;
    }
}