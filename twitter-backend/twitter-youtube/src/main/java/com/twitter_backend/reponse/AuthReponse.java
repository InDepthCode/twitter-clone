package com.twitter_backend.reponse;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthReponse {

    private String jwt;
    private boolean status;

}
