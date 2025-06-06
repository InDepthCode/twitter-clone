package com.twitter_backend.util;

import com.twitter_backend.model.User;

public class UserUtil {

    public static final boolean isReqUser(User reqUser, User user2){
        return reqUser.getId().equals(user2.getId());

    }


    public static boolean isFollowedByReqUser(User reqUser, User user2){
        return reqUser.getFollowings().contains(user2);
    }
}
