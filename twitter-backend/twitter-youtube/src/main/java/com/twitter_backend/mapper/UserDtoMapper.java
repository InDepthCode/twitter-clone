package com.twitter_backend.mapper;

import com.twitter_backend.dto.UserDto;
import com.twitter_backend.model.User;

import java.util.ArrayList;
import java.util.List;

public class UserDtoMapper {
    public static UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setFullName(user.getFullName());
        userDto.setImage(user.getImage());
        userDto.setLocation(user.getLocation());
        userDto.setWebsite(user.getWebsite());
        userDto.setBirthDate(user.getBirthDate());
        userDto.setBio(user.getBio());
        userDto.setBackgroundImage(user.getBackGroundImage()); // Corrected method name for backgroundImage
        userDto.setLogin_with_google(user.isLogin_with_google()); // Using isLogin_with_google() for boolean getter
//        userDto.setVerified(false);


        // Using your new helper method for lists:
        // Converts the list of User entity followers to a list of UserDto followers.
        userDto.setFollowers(toUserDto(user.getFollowers()));

        // Converts the list of User entity followings to a list of UserDto followings.
        userDto.setFollowing(toUserDto(user.getFollowings()));

        // (Other fields like 'followed' and 'isVerified' would be set here,
        // often requiring additional logic or direct fields from the User model)

        return userDto;
    }

    public static List<UserDto> toUserDto(List<User> followers) {

        List<UserDto> userDtos = new ArrayList<>();
        for (User user : followers) {
            userDtos.add(toUserDto(user));
        }

        return userDtos;

    }
}
