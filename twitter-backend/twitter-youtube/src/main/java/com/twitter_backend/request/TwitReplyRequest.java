package com.twitter_backend.request;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class TwitReplyRequest {

    private String content;
    private Long twitId;
    private LocalDateTime createdAt;
    private String image;
}
