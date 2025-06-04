package com.twitter_backend.mapper;

import com.twitter_backend.dto.LikeDto;
import com.twitter_backend.dto.TwitDto;
import com.twitter_backend.dto.UserDto;
import com.twitter_backend.model.Like;
import com.twitter_backend.model.Twit;
import com.twitter_backend.model.User;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {

    // Maps a Like entity to LikeDto including user and twit details , refer to LikeDtoImg
    public static LikeDto toLikeDto(Like like, User reqUser){
        UserDto user = UserDtoMapper.toUserDto(like.getUser()); // Convert liked user to UserDto
        UserDto reqUserDto = UserDtoMapper.toUserDto(reqUser); // Convert requesting user to UserDto
        TwitDto twit = TwitDtoMapper.toTwitDto(like.getTwit(), reqUser); // Convert liked tweet to TwitDto

        LikeDto likeDto = new LikeDto(); // Create LikeDto object
        likeDto.setUser(user); // Set user who liked
        likeDto.setTwit(twit); // Set twit that was liked
        likeDto.setId(like.getId()); // Set like ID

        return likeDto; // Return the LikeDto
    }

    // Maps a list of Like entities to a list of LikeDtos, refer to toLikeDtoImg
    public static List<LikeDto> toLikeDtos(List<Like> likes, User reqUser){
        List<LikeDto> likeDtos = new ArrayList<>(); // List to store mapped LikeDtos

        for(Like like : likes){
            LikeDto likeDto = toLikeDto(like, reqUser); // Map each Like to LikeDto
            likeDtos.add(likeDto); // Add to result list
        }

        return likeDtos; // Return list of LikeDtos
    }
}
