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
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto-generates a unique ID for each user.
    private Long id;

    private String fullName; // Stores the user's full name.

    private String location; // Stores the user's geographical location.

    private String website; // Stores the URL of the user's personal website.

    private String birthDate; // Stores the user's birth date.

    private String email; // Stores the user's email address (often used for login).

    private String password; // Stores the hashed password for user authentication.

    private String image; // Stores the URL of the user's profile picture.

    private String backGroundImage; // Stores the URL of the user's profile background image.

    private String bio; // Stores a short biography or description about the user.

    private boolean req_user; // Indicates if this is the currently authenticated/requested user (often temporary).

    private boolean login_with_google; // Flags if the user registered/logged in via Google.

    @JsonIgnore // Prevents this field from being serialized to JSON when the User object is returned.
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)  // A single user can have multiple tweets.
    private List<Twit> twit = new ArrayList<>();

    // CascadeType.ALL ensures that if a user is deleted, all their associated tweets are also deleted.

    // List of likes made by this user.
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL) // One user can make many likes.
    private List<Like> likes = new ArrayList<>();

    @Embedded // Embeds fields from the Varification class directly into the User table.
    private Varification verification;

    @JsonIgnore // Prevents follower list from being serialized to JSON.
    @ManyToMany // Many users can follow many other users (bi-directional relationship).
    private List<User> followers = new ArrayList<>();

    @JsonIgnore // Prevents following list from being serialized to JSON.
    @ManyToMany // Many users can follow many other users (bi-directional relationship).
    private List<User> followings = new ArrayList<>();

}