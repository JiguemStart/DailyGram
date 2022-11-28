package com.springboot.backend.data.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode(callSuper = true)
@Table(name = "token")
public class Token extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 회원고유id

    @Column(name = "access_token", columnDefinition = "TEXT")
    private String accessToken; // 액세스토큰

    @Column(name = "refresh_token", columnDefinition = "TEXT")
    private String refreshToken; // 리프레쉬토큰

}
