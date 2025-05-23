package com.twitter_backend.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Varification {

    private boolean statu=false;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private String planType;


}
