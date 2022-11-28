package com.springboot.backend.service.impl;

import com.springboot.backend.data.dto.MemberDto;
import com.springboot.backend.data.dto.MemberResponseDto;
import com.springboot.backend.data.entity.Member;
import com.springboot.backend.data.entity.Token;
import com.springboot.backend.data.repository.MemberRepository;
import com.springboot.backend.data.repository.TokenRepository;
import com.springboot.backend.result.LoginResult;
import com.springboot.backend.service.MemberService;
import com.springboot.backend.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final TokenRepository tokenRepository;
    private PasswordEncoder passwordEncoder;
    private final SecurityService securityService;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository,
                             PasswordEncoder passwordEncoder,
                             SecurityService securityService,
                             TokenRepository tokenRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.securityService = securityService;
        this.tokenRepository = tokenRepository;
    }


    @Override
    public MemberResponseDto saveMemberDto(MemberDto memberDto) {

        Member member = new Member();
        member.setEmail(memberDto.getEmail());
        member.setPasswordQuestion(memberDto.getPasswordQuestion());
        member.setPasswordAnswer(memberDto.getPasswordAnswer());
        ///////
        String encodedPassword = passwordEncoder.encode(memberDto.getPassword());
        member.setPassword(encodedPassword);
        ///////
        memberRepository.save(member);

        MemberResponseDto memberResponseDto = new MemberResponseDto();
        memberResponseDto.setId(member.getId());
        memberResponseDto.setEmail(member.getEmail());
        memberResponseDto.setPassword(member.getPassword());
        memberResponseDto.setPasswordQuestion(member.getPasswordQuestion());
        memberResponseDto.setPasswordAnswer(member.getPasswordAnswer());
        memberResponseDto.setCreatedAt(member.getCreatedAt());
        memberResponseDto.setUpdatedAt(member.getUpdatedAt());

        return memberResponseDto;

    }

    @Override
    public LoginResult login(String email, String password) {

        Optional<Member> loginMember = memberRepository.findByEmail(email);

        if (loginMember.isEmpty()) {
            // 해당 이메일은 존재하지 않는 이메일입니다.
            return new LoginResult(false, "해당 이메일은 존재하지 않는 이메일입니다.", null, null);
        } else if (!passwordEncoder.matches(password, loginMember.get().getPassword())) {
            // 비밀번호가 일치하지 않습니다.
            return new LoginResult(false, "비밀번호가 일치하지 않습니다.", null, null);
        } else {
            // 로그인 성공

            String accessToken = securityService.createToken1(email, (2*60*1000*60)); // 2시간짜리 토큰
            String refreshToken = securityService.createToken2(email, (24*60*1000*60)); // 24시간짜리 토큰

            // DB에 토큰 쌍 저장하기
            Token token = new Token();
            token.setAccessToken(accessToken);
            token.setRefreshToken(refreshToken);
            tokenRepository.save(token);


            return new LoginResult(true, "로그인 성공", accessToken, refreshToken);
        }

    }
}
