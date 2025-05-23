package com.twitter_backend.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Twit {

    // this entity will create tweet and reply entity

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @ManyToOne  // one tweet one user
    private User user;


    private String content;
    private String image;
    private String video;w

    @OneToMany(mappedBy = "twit", cascade = CascadeType.ALL)  // one user  can like one tweet
    private List<Like> likes = new ArrayList<>();

    @OneToMany // only one will be reply for a tweet
    private List<Twit> replyTwits = new ArrayList<>();


    @ManyToMany
    private List<User> retwitUser = new ArrayList<>();


    @ManyToOne // one tweet can have multiple replies
    private Twit replyFor;

    
    private boolean isReply; // checking if its actual tweet or reply
    private boolean isTwit;

}
