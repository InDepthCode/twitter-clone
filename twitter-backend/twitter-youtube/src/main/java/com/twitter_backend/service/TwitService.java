package com.twitter_backend.service;

import com.twitter_backend.exception.TwitException;
import com.twitter_backend.exception.UserException;
import com.twitter_backend.model.Twit;
import com.twitter_backend.model.User;
import com.twitter_backend.request.TwitReplyRequest;

import java.util.List;

public interface TwitService {

    public Twit createTwit(Twit req, User user) throws UserException; // Creates a new tweet (from 'req' data) for the specified 'user'.

    public List<Twit> findAllTwit(); // Retrieves all tweets; no parameters needed as it's a general fetch.

    public Twit retwit(Long twitId, User user) throws UserException, TwitException; // Retweets the 'twitId' tweet by the given 'user'.

    public Twit findById(Long twitId) throws TwitException; // Finds a tweet by its unique 'twitId'.

    public void deleteTwitById(Long twitId, Long userId) throws TwitException, UserException; // Deletes the 'twitId' tweet, ensuring it belongs to 'userId' for security.

//    public Twit removeFromRetwit(Long twitId, User user) throws UserException, TwitException; // Removes the 'user's' retweet from the specified 'twitId'.

    public Twit createReply(TwitReplyRequest req, User user) throws TwitException; // Creates a reply (from 'req' data) to an existing tweet by the 'user'.

    public List<Twit> getUserTwit(User user); // Gets all tweets originally posted by the provided 'user'.

    public List<Twit> findByLikesContainsUser(User user); // Finds all tweets that have been liked by the specified 'user'.
}