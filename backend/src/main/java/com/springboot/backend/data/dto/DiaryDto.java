package com.springboot.backend.data.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class DiaryDto {

    private String date; // 날짜
    private String weather; // 날씨
    private String feeling; // 기분
    private String title; // 제목
    private String content; // 내용
//    private Long memberId;
}
