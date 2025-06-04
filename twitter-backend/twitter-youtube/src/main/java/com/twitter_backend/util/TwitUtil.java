package com.twitter_backend.util;

import com.twitter_backend.model.Like;
import com.twitter_backend.model.Twit;
import com.twitter_backend.model.User;

public class TwitUtil {

    public static boolean isLikedByUser(User reqUser, Twit twit) {
        // Checks if the given user has liked the provided twit.
        for(Like like : twit.getLikes()) {
            if(like.getUser().getId().equals(reqUser.getId())) {
                return true;
            }
        }
        return false;
    }


    public static boolean isRetwittedByUser(User reqUser, Twit twit){
        // Checks if the given user has retwitted the provided twit.
        for(User user: twit.getRetwitUser()){
            if(user.getId().equals(reqUser.getId())) {
                return true;
            }
        }
        return false;
    }
}