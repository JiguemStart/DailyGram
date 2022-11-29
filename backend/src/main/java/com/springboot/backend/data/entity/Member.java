package com.springboot.backend.data.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
@Table(name = "member")
public class Member extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 회원고유id

    @Column(name = "email", unique = true)
    private String email; // 이메일

    @Column(name = "password")
    private String password; // 비밀번호

    @Column(name = "password_question")
    private String passwordQuestion; // 비밀번호변경질문

    @Column(name = "password_answer")
    private String passwordAnswer; // 비밀번호변경질문

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<Diary> diaryList = new ArrayList<>();

}
