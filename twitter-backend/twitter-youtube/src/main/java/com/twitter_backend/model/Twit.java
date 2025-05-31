package com.twitter_backend.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Twit {

    // This entity represents a tweet or a reply in the Twitter-like application.
    // (Original: this entity will create tweet and reply entity) - This is more descriptive.

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    // Correct and clear.
    // many twits related to one user so manytoone
    @ManyToOne  // One user can post many tweets/replies. (Original: one tweet one user) - This comment was slightly misleading, implying only one tweet per user which is incorrect. "Many twits related to one user" is good.
    private User user;


    private String content;
    private String image;
    private String video;

    /*
     * mappedBy = "twit" means the 'Like' entity has a field named 'twit'
     * that establishes the relationship back to this 'Twit' entity.
     *
     * @OneToMany tells that one Twit (tweet) can have many Likes.
     *
     * */
    @OneToMany(mappedBy = "twit", cascade = CascadeType.ALL)  // (Original: one user can like one tweet) - This comment is still confusing and slightly incorrect here. It should describe the Twit-Like relationship from the Twit side.
    private List<Like> likes = new ArrayList<>();


    /*
     * @OneToMany means one Twit (original tweet) can have multiple reply Twits.
     * This field represents the list of replies to this specific tweet.
     * */
    @OneToMany
    private List<Twit> replyTwits = new ArrayList<>();


    /*
     * one tweet can be retweeted multiple times and
     * one user can retweet multiple tweets. This creates a many-to-many relationship
     * between Twit (tweet) and User (who retweets).
     * Correct and complete.
     * */
    @ManyToMany
    private List<User> retwitUser = new ArrayList<>();


    /*
     * This field indicates which original tweet this current tweet is a reply to.
     * A single tweet (the original) can have multiple replies (many replies to one original tweet),
     * but a specific reply tweet can only be a reply to one original tweet.
     * Correct and complete.
     * */
    @ManyToOne
    private Twit replyFor;


    private boolean isReply; // Correct. checking if its actual tweet or reply
    private boolean isTwit; // This field might be redundant if 'isReply' is true/false. If isReply=true, then it's a reply; if isReply=false, then it's an original tweet (isTwit=true implicitly). Consider removing one for clarity, or clarify its exact purpose if it means something else (e.g., distinguishing original tweets from retweets or replies).


    private LocalDateTime createdAt;
}