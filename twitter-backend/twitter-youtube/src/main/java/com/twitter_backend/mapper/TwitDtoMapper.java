package com.twitter_backend.mapper;

import com.twitter_backend.dto.TwitDto;
import com.twitter_backend.dto.UserDto;
import com.twitter_backend.model.Twit;
import com.twitter_backend.model.User;

public class TwitDtoMapper {
    public static TwitDto toTwitDto(Twit twit, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(twit.getUser());

        // 1:45:00


        return  null;

    }

}
