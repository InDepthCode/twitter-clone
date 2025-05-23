package com.twitter_backend.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.apache.catalina.User;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

public class JwtProvider {

    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    // generate token

    public String generateJwtToken(Authentication authentication) {
        String jwt = Jwts.builder()
                .setIssuedAt(Date.from(Instant.now()))
                .setEpiration(new Date(new))
    }
}
