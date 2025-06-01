package com.twitter_backend.service;

import com.twitter_backend.exception.TwitException;
import com.twitter_backend.exception.UserException;
import com.twitter_backend.model.Like;
import com.twitter_backend.model.User;

import java.util.List;

public interface LikeService {


    /* This method is to like and unlike the tweet */
    public Like likeTwit(Long twitId, User user) throws UserException, TwitException;


    /*get all the list of likes by user*/
    public List<Like> getAllLikes(Long twitId) throws TwitException;



}
