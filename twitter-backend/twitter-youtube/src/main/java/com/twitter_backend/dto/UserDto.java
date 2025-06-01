package com.twitter_backend.dto;


import com.twitter_backend.model.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDto {

    private Long id; // Unique identifier for the user.
    private String fullName; // The user's full name.
    private String email; // The user's email address.
    private String image; // URL for the user's profile picture.
    private String location; // The user's geographical location.
    private String website; // The URL of the user's personal website.
    private String birthDate; // The user's birth date.
    private String mobile; // The user's mobile number.
    private String backgroundImage; // URL for the user's profile background image.
    private String bio; // A short biography or description of the user.
    private boolean req_user; // Indicates if this is the currently requested or authenticated user.
    private boolean login_with_google; // True if the user logged in using Google.

    private List<UserDto> followers = new ArrayList<>(); // List of users following this user.
    private List<UserDto> following = new ArrayList<>(); // List of users this user is following.

    private boolean followed; // True if the logged-in user is following this user.
    private boolean isVerified; // True if the user account is verified.

}
