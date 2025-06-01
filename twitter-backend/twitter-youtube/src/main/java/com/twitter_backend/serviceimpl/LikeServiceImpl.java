package com.twitter_backend.serviceimpl;

import com.twitter_backend.exception.TwitException;
import com.twitter_backend.exception.UserException;
import com.twitter_backend.model.Like;
import com.twitter_backend.model.Twit;
import com.twitter_backend.model.User;
import com.twitter_backend.repository.LikeRepository;
import com.twitter_backend.repository.TwitRepository;
import com.twitter_backend.repository.UserRepository;
import com.twitter_backend.service.LikeService;
import com.twitter_backend.service.TwitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private TwitRepository twitRepository;

    @Autowired
    private TwitService twitService;

    @Override
    public Like likeTwit(Long twitId, User user) throws UserException, TwitException {
        // Toggles a user's like on a tweet: removes existing like if found, otherwise creates a new like and updates the tweet's like count.
        Like isLikeExists = likeRepository.isLikeExits(user.getId(), twitId); // Check if the user has already liked this tweet.
        if (isLikeExists != null) { // If a like already exists...
            likeRepository.deleteById(isLikeExists.getId()); // ...delete that existing like.
            return isLikeExists; // Return the (now deleted) like object.
        }

        Twit twit = twitService.findById(twitId); // Find the tweet that is being liked.
        Like like = new Like(); // Create a new Like object.
        like.setTwit(twit); // Associate the like with the tweet.
        like.setUser(user); // Associate the like with the user.

        Like savedLike = likeRepository.save(like); // Save the new like to the database.
        twit.getLikes().add(like); // Add the new like to the tweet's list of likes (in memory).
        twitRepository.save(twit); // Save the tweet to persist the updated list of likes.
        return savedLike; // Return the newly created and saved like.
    }

    @Override
    public List<Like> getAllLikes(Long twitId) throws TwitException {
        // Twit twit = twitService.findById(twitId); // If TwitService is injected

        // If you don't have TwitService injected, you can find the twit using twitRepository
        Twit twit = twitRepository.findById(twitId)
                .orElseThrow(() -> new TwitException("Twit Not Found with ID: " + twitId));


        // Corrected call to the repository method
        List<Like> likes = likeRepository.findByTwit_Id(twitId);

        return likes;
    }
}
