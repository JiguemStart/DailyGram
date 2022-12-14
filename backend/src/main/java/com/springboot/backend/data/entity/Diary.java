package com.springboot.backend.data.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Table(name = "dairy")
public class Diary extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 고유번호

    @Column(name = "date")
    private String date; // 날짜

    @Column(name = "weather")
    private String weather; // 날씨

    @Column(name = "feeling")
    private String feeling; // 기분

    @Column(name = "title")
    private String title; // 제목

    @Column(name = "content", columnDefinition = "TEXT")
    private String content; // 내용

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
