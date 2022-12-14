package com.springboot.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.sql.Date;

@Service
public class SecurityService {
    private static final String SECRET_KEY1 = "asdfsadfijwekjfkbsdkfbaksdjfzkxcvjkasdjfkajsdlfiqjwekfjasdf";
    private static final String SECRET_KEY2 = "qwefihasdfhjxhzcvijasidjfjhqwkjfhaskjdfhwefqwdfasdfqwefqwddvnjj";

    // 로그인 서비스 던질때 같이 ~~~
    public String createToken1(String subject , long expTime) {
        if(expTime<=0) {
            throw new RuntimeException("만료시간이 0보다 커야합니다.");
        }

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY1);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        return Jwts.builder()
                    .setSubject(subject)
                    .signWith(signingKey, signatureAlgorithm)
                    .setExpiration(new Date(System.currentTimeMillis() + expTime))
                    .compact();
    }

    public String createToken2(String subject , long expTime) {
        if(expTime<=0) {
            throw new RuntimeException("만료시간이 0보다 커야합니다.");
        }

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY2);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        return Jwts.builder()
                .setSubject(subject)
                .signWith(signingKey, signatureAlgorithm)
                .setExpiration(new Date(System.currentTimeMillis() + expTime))
                .compact();
    }

    // Acess 토큰검증하는 메서드: boolean
    public String getSubject1(String token) throws Exception{
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY1))
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    // Refresh 토큰검증하는 메서드
    public String getSubject2(String token) throws Exception{
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY2))
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

}
