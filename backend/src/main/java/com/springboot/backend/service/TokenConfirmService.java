package com.springboot.backend.service;

import com.springboot.backend.data.entity.Token;
import com.springboot.backend.data.repository.MemberRepository;
import com.springboot.backend.data.repository.TokenRepository;
import com.springboot.backend.result.ConnectResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TokenConfirmService {
    private final SecurityService securityService;
    private final TokenRepository tokenRepository;
    private final MemberRepository memberRepository;


    @Autowired
    public TokenConfirmService(SecurityService securityService,
                               TokenRepository tokenRepository,
                               MemberRepository memberRepository) {
        this.securityService = securityService;
        this.tokenRepository = tokenRepository;
        this.memberRepository = memberRepository;
    }

    public ConnectResult confrimToken(String accessToken, String refreshToken) {
        String resultEmail = null;
        try {
            resultEmail = securityService.getSubject1(accessToken); // Access Token 먼저검증해봐
        } catch (Exception e) { // 만약 Access Token 값이 만료되었으면,
            Optional<Token> tokenOptional = tokenRepository.findByAccessToken(accessToken);
            // 토큰쌍에 조회가되는놈이면, Refresh Token으로 검증해보자
            if (tokenOptional.isPresent()) { // refreshToken이랑 accessToken 이랑 한쌍이면,
                if (tokenOptional.get().getRefreshToken().equals(refreshToken)) {
                    // access token 새로 발급해주고 한쌍으로 묶어주자
                    // 그전에 refresh token으로 email을 구하자

                    String tempEmail = null;
                    try {
                        tempEmail = securityService.getSubject2(refreshToken);
                    } catch (Exception ex) {
                        throw new RuntimeException(ex);
                    }

                    String newAccessToken = securityService.createToken1(tempEmail, (2*60*1000*60)); // 2시간짜리 토큰
                    //  Access Token 새로 발급해주어야한다.
                    Token token = tokenOptional.get();
                    token.setAccessToken(newAccessToken);
                    tokenRepository.save(token);
                    // 토큰쌍도 Update 완료

                    return new ConnectResult(true, newAccessToken, tempEmail);
                    // 그리고 통과할수있도록 true랑 새로운 Access token 던져주자
                }
            } else { // refreshToken이랑 accessToken이랑 맞는것도 아니고, accesstoken에 맞는 RT도 없다면
                return new ConnectResult(false, null, null); // false 리턴
            }
        }
        // AT 검증했는데, Email(Subject)이 잘나왔어.
        if (memberRepository.findByEmail(resultEmail).isPresent()) { //
            return new ConnectResult(true, null, resultEmail); // 잘 나왔으면 true
        } else {
            return new ConnectResult(false, null, null); // 이상한값 입력했으면 false
        }

    }

}
