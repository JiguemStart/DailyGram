package com.springboot.backend.data.dto;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Setter
@Getter
public class DiaryResponseDto {

    private Long id;
    private String date; // 날짜
    private String weather; // 날씨
    private String feeling; // 기분
    private String title; // 제목
    private String content; // 내용
    private LocalDateTime createdAt; // 등록날짜
    private LocalDateTime updatedAt; // 수정날짜
    private Long memberId;

}
