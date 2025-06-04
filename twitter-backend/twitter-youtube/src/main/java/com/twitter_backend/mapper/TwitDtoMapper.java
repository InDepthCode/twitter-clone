package com.twitter_backend.mapper;

import com.twitter_backend.dto.TwitDto;
import com.twitter_backend.dto.UserDto;
import com.twitter_backend.model.Twit;
import com.twitter_backend.model.User;
import com.twitter_backend.util.TwitUtil;

import java.util.ArrayList;
import java.util.List;

public class TwitDtoMapper {

    // Maps a single Twit to TwitDto including replies and user interactions , refer to toTwitDtoImg

    // Timeline Mapping (toTwitDtoList) – A feed showing multiple tweets with basic details like content, likes, and retweets.

    public static TwitDto toTwitDto(Twit twit, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(twit.getUser()); // Map Twit user to UserDto
        boolean isLiked = TwitUtil.isLikedByUser(reqUser, twit); // Check if user liked
        boolean isRetwited = TwitUtil.isRetwittedByUser(reqUser, twit); // Check if user retweeted

        List<Long> retwitUserId = new ArrayList<>();
        for(User user1: twit.getRetwitUser()){
            retwitUserId.add(user1.getId()); // Collect IDs of users who retweeted
        }

        TwitDto twitDto = new TwitDto();
        twitDto.setId(twit.getId()); // Set twit ID
        twitDto.setContent(twit.getContent()); // Set content
        twitDto.setCreatedAt(twit.getCreatedAt()); // Set timestamp
        twitDto.setImage(twit.getImage()); // Set image if any
        twitDto.setTotalLikes(twit.getLikes().size()); // Set like count
        twitDto.setTotalReplies(twit.getReplyTwits().size()); // Set reply count
        twitDto.setTotalRetweets(twit.getRetwitUser().size()); // Set retweet count
        twitDto.setUser(user); // Set user info
        twitDto.setLiked(isLiked); // Set user like status
        twitDto.setRetwit(isRetwited); // Set user retweet status
        twitDto.setRetwitUsersId(retwitUserId); // Set list of retweeting user IDs
        twitDto.setReplyTwits(toTwitDtoList(twit.getReplyTwits(), reqUser)); // Map replies
        twitDto.setVideo(twit.getVideo()); // Set video if any

        return twitDto;
    }

    // Maps a list of Twits to a list of TwitDtos (e.g., timeline) refer toTwitDtoListImg

    // Full Tweet Mapping (toTwitDto) – A single tweet showing all its details, including replies, images, videos, and who liked or retweeted it.

    public static List<TwitDto> toTwitDtoList(List<Twit> twits, User reqUser) {
        List<TwitDto> twitDtos = new ArrayList<>();
        for(Twit twit: twits){
            TwitDto twitDto = toReplyTwitDto(twit, reqUser); // Map each twit without nesting replies
            twitDtos.add(twitDto);
        }
        return twitDtos;
    }

    // Maps a Twit to TwitDto for replies (no nested replies to avoid infinite loop) refer to toReplyTwitDtoImg

    // Reply Mapping (toReplyTwitDto) – A reply to a tweet showing only its details without showing further replies to avoid deep nesting.

    private static TwitDto toReplyTwitDto(Twit twit, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(twit.getUser()); // Map Twit user to UserDto
        boolean isLiked = TwitUtil.isLikedByUser(reqUser, twit); // Check if user liked
        boolean isRetwited = TwitUtil.isRetwittedByUser(reqUser, twit); // Check if user retweeted

        List<Long> retwitUserId = new ArrayList<>();
        for(User user1: twit.getRetwitUser()){
            retwitUserId.add(user1.getId()); // Collect IDs of users who retweeted
        }

        TwitDto twitDto = new TwitDto();
        twitDto.setId(twit.getId()); // Set twit ID
        twitDto.setContent(twit.getContent()); // Set content
        twitDto.setCreatedAt(twit.getCreatedAt()); // Set timestamp
        twitDto.setImage(twit.getImage()); // Set image if any
        twitDto.setTotalLikes(twit.getLikes().size()); // Set like count
        twitDto.setTotalReplies(twit.getReplyTwits().size()); // Set reply count
        twitDto.setTotalRetweets(twit.getRetwitUser().size()); // Set retweet count
        twitDto.setUser(user); // Set user info
        twitDto.setLiked(isLiked); // Set user like status
        twitDto.setRetwit(isRetwited); // Set user retweet status
        twitDto.setRetwitUsersId(retwitUserId); // Set list of retweeting user IDs
        twitDto.setVideo(twit.getVideo()); // Set video if any

        return twitDto;
    }
}
