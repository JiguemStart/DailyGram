package com.springboot.backend.data.dto;

import lombok.*;

import javax.persistence.Column;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MemberDto {

    private String email; // 이메일
    private String password; // 비밀번호
    private String passwordQuestion; // 비밀번호변경질문
    private String passwordAnswer; // 비밀번호변경질문

}
