package com.springboot.backend.data.dto;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Setter
@Getter
public class MemberResponseDto {

    private Long id;
    private String email; // 이메일
    private String password; // 비밀번호
    private String passwordQuestion; // 비밀번호변경질문
    private String passwordAnswer; // 비밀번호변경질문
    private LocalDateTime createdAt; // 등록날짜
    private LocalDateTime updatedAt; // 수정날짜

}
