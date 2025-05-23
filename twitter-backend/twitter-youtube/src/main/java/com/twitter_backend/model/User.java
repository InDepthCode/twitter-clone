package com.twitter_backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // it will auto generate id
    private Long id;

    private String fullName;

    private String location;

    private String website;

    private String birthDate;

    private String email;

    private String password;

    private String image;

    private String backGroundImage;

    private String bio;

    private boolean req_user;

    private boolean login_with_google;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)  // one user has multiple tweets
    private List<Twit> twit = new ArrayList<>();

    // cascade here is used for a purpose suppose i have removed this user then all the tweets related to him gets removed

    // list of likes done by user
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL) //
    private List<Like> likes = new ArrayList<>();

    @Embedded
    private Varification verification;

    @JsonIgnore
    @ManyToMany // for followers, one user has multiple followers and multiple following
    private List<User> followers = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    private List<User> followings = new ArrayList<>();



}
