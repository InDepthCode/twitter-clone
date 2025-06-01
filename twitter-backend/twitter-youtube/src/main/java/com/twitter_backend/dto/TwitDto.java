package com.twitter_backend.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TwitDto {

    private Long id; // Unique identifier for the tweet.
    private String content; // The text content of the tweet.
    private String image; // URL of an image attached to the tweet.
    private String Video; // URL of a video attached to the tweet.
    private UserDto user; // Information about the user who posted the tweet.
    private LocalDateTime createdAt; // Timestamp indicating when the tweet was created.
    private int totalLikes; // Total number of likes this tweet has received.
    private int totalReplies; // Total number of replies this tweet has.
    private int totalRetweets; // Total number of times this tweet has been retweeted.
    private boolean isLiked; // True if the currently logged-in user has liked this tweet.
    private boolean isRetwit; // True if the tweet is a retweet (or if the logged-in user retweeted it).

    private List<Long> retwitUsersId; // List of IDs of users who retweeted this tweet.
    private List<TwitDto> replyTwits; // List of replies to this tweet, represented as TwitDto objects.

}