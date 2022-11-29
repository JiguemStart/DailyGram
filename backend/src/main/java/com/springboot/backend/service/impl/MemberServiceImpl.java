package com.springboot.backend.service.impl;

import com.springboot.backend.data.dto.MemberDto;
import com.springboot.backend.data.dto.MemberResponseDto;
import com.springboot.backend.data.entity.Member;
import com.springboot.backend.data.entity.Token;
import com.springboot.backend.data.repository.MemberRepository;
import com.springboot.backend.data.repository.TokenRepository;
import com.springboot.backend.result.ConnectResult;
import com.springboot.backend.result.LoginResult;
import com.springboot.backend.result.PasswordChangeResult;
import com.springboot.backend.result.WithdrawalResult;
import com.springboot.backend.service.MemberService;
import com.springboot.backend.service.SecurityService;
import com.springboot.backend.service.TokenConfirmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final TokenRepository tokenRepository;
    private PasswordEncoder passwordEncoder;
    private final SecurityService securityService;
    private final TokenConfirmService tokenConfirmService;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository,
                             PasswordEncoder passwordEncoder,
                             SecurityService securityService,
                             TokenRepository tokenRepository,
                             TokenConfirmService tokenConfirmService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.securityService = securityService;
        this.tokenRepository = tokenRepository;
        this.tokenConfirmService = tokenConfirmService;
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

    @Override
    public WithdrawalResult deleteMember(String accessToken, String refreshToken) {

        ConnectResult connectResult = tokenConfirmService.confrimToken(accessToken, refreshToken);
        // 1 AT, RT 모두 유효하면 (result:true, newAccessToken:null, email:이메일값)
        // 2 AT 가 새로 발급됐으면 (result:true, newAccessToken:새로발급된 토큰값, email:이메일값)
        // 3 AT, RT 모두다 유효하지 않으면 (result:false, newAccessToken:null, email:null)

        if (connectResult.isTokenResult()) { // 일단 접속 성공했으면,
            Optional<Member> optionalMember = memberRepository.findByEmail(connectResult.getEmail());
            if (optionalMember.isPresent()) {
                Long memberId = optionalMember.get().getId();
                memberRepository.deleteById(memberId);
                return new WithdrawalResult(true, true);
            } else {
                return new WithdrawalResult(true, false);
            }
        } else {
            return new WithdrawalResult(false, false);
        }

    }

    @Override
    public PasswordChangeResult changePassword(String passwordQuestion, String passwordAnswer, String newPassword,
                                               String accessToken, String refreshToken
                                  ) {
        ConnectResult connectResult = tokenConfirmService.confrimToken(accessToken, refreshToken);
        // 1 AT, RT 모두 유효하면 (result:true, newAccessToken:null, email:이메일값)
        // 2 AT 가 새로 발급됐으면 (result:true, newAccessToken:새로발급된 토큰값, email:이메일값)
        // 3 AT, RT 모두다 유효하지 않으면 (result:false, newAccessToken:null, email:null)
        if (connectResult.isTokenResult()) { // 일단 접속 성공했으면,
            Optional<Member> optionalMember = memberRepository.findByEmail(connectResult.getEmail());
            if (optionalMember.isPresent()) {
                if (optionalMember.get().getPasswordQuestion().equals(passwordQuestion)) {
                    if (optionalMember.get().getPasswordAnswer().equals(passwordAnswer)) {
                        // 질문, 답변이 모두 일치한다면 newPassword 적용하자.
                        Member member = optionalMember.get();

                        String encodedPassword = passwordEncoder.encode(newPassword);
                        member.setPassword(encodedPassword);

                        memberRepository.save(member);
                        ///////////////////
                        return new PasswordChangeResult(true, connectResult.getNewAccessToken(), true);
                    } else {
                        return new PasswordChangeResult(true, connectResult.getNewAccessToken(), false); // 비번질문이 안맞는다면 false
                    }
                } else {
                    return new PasswordChangeResult(true, connectResult.getNewAccessToken(), false); // 질문이 틀리다면 false
                }

            } else {
                return new PasswordChangeResult(true, connectResult.getNewAccessToken(), false);
            }

        } else { // 토큰인증 실패했다면
            return new PasswordChangeResult(false, null, false);
        }
    }

    @Override
    public boolean searchPassword(String email, String passwordAnswer, String newPassword) {
        // 이메일로 member정보 찾아서,
        // passwordAnswer 맞는지 확인하고
        // new password로 적용시켜주자
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            if (optionalMember.get().getPasswordAnswer().equals(passwordAnswer)) {
                // 답변이 모두 일치한다면 newPassword 적용하자.
                Member member = optionalMember.get();

                String encodedPassword = passwordEncoder.encode(newPassword);
                member.setPassword(encodedPassword);

                memberRepository.save(member);
                ///////////////////
                return true; // 전부다 일치한다면
            } else {
                return false; // 비밀번호답안이 일치하지않는다면
            }


        } else {
            return false; // 이메일이 검색이 안되는 경우
        }

    }


    @Override
    public boolean duplicateCheck(String email) {


        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent()) {
            memberRepository.deleteById(optionalMember.get().getId());
            return true;
        } else {
            return false;
        }
    }
}
