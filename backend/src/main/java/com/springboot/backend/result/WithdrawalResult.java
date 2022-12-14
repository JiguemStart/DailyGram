package com.springboot.backend.result;

import lombok.Data;

@Data // Getter, Setter, ToString, EqualsAndHashCode
public class WithdrawalResult<T> {
    private boolean tokenResult;
    private boolean withdrawalResult;

    public WithdrawalResult(boolean tokenResult,
                            boolean withdrawalResult) {
        this.tokenResult = tokenResult;
        this.withdrawalResult = withdrawalResult;
    }
}