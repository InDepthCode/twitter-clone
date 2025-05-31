package com.twitter_backend.serviceimpl;


import com.twitter_backend.exception.TwitException;
import com.twitter_backend.exception.UserException;
import com.twitter_backend.model.Twit;
import com.twitter_backend.model.User;
import com.twitter_backend.repository.TwitRepository;
import com.twitter_backend.repository.UserRepository;
import com.twitter_backend.request.TwitReplyRequest;
import com.twitter_backend.service.TwitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TwitServiceImpl implements TwitService {


    @Autowired
    TwitRepository twitRepository;

    @Autowired
    UserRepository userRepository;


    @Override
    public Twit createTwit(Twit req, User user) throws UserException {

        Twit twit = new Twit();
        twit.setContent(req.getContent());
        twit.setCreatedAt(LocalDateTime.now());
        twit.setImage(req.getImage());
        twit.setUser(user);
        twit.setReply(false); // Correct: Lombok generates setReply() for a boolean field named isReply
        twit.setTwit(true);
        twit.setVideo(req.getVideo());
        return twitRepository.save(twit);
    }

    @Override
    public List<Twit> findAllTwit() {
        return twitRepository.findAllByIsTwitTrueOrderByCreatedAtDesc();
    }

    @Override
    public Twit retwit(Long twitId, User user) throws UserException, TwitException {
        // Toggles a retweet for the given twitId by the user: adds if not retweeted, removes if already retweeted.
        Twit twit = findById(twitId);
        if(twit.getRetwitUser().contains(user)){
            twit.getRetwitUser().remove(user);
        }

        else{
            twit.getRetwitUser().add(user);
        }
        return twitRepository.save(twit);

    }

    @Override
    public Twit findById(Long twitId) throws TwitException { // Corrected: Removed UserException from throws clause
        // Finds a Twit by its ID, throwing a TwitException if not found.
        return twitRepository.findById(twitId).orElseThrow(() -> new TwitException("Twit Not Found with ID: " + twitId));
    }

    @Override
    public void deleteTwitById(Long twitId, Long userId) throws TwitException, UserException {
        Twit twit = findById(twitId);
        //only the author of tweet can delete the tweet
        if(!userId.equals(twit.getUser().getId())){
            throw new TwitException("You cant delete twit without user");
        }

        twitRepository.deleteById(twit.getId());
    }

//    @Override
//    public Twit removeFromRetwit(Long twitId, User user) throws UserException, TwitException {
//        return null;
//    }

    @Override
    public Twit createReply(TwitReplyRequest req, User user) throws TwitException {
        // 1. Find the original tweet to which this is a reply.
        Twit existingTwit = findById(req.getTwitId()); // Find the tweet being replied to.

        // 2. Create the new reply Twit object.
        Twit replyTwit = new Twit(); // Initialize a new Twit for the reply.
        replyTwit.setContent(req.getContent()); // Set content from the request.
        replyTwit.setCreatedAt(LocalDateTime.now()); // Set the creation timestamp.
        replyTwit.setImage(req.getImage()); // Set image URL from the request.
        replyTwit.setUser(user); // Set the user who is posting this reply.
        replyTwit.setReply(true); // Mark this Twit as a reply.
        replyTwit.setTwit(false); // Mark this Twit as NOT an original main tweet. (Assuming 'isTwit' means original tweet)


        // 3. Link the new reply to its parent (original) tweet.
        replyTwit.setReplyFor(existingTwit); // Set the original tweet this is a reply to.

        // 4. Save the new reply Twit to the database.
        Twit savedReplyTwit = twitRepository.save(replyTwit); // Persist the new reply.

        // 5. IMPORTANT: Add the new reply to the original tweet's 'replyTwits' list and save the original tweet.
        existingTwit.getReplyTwits().add(savedReplyTwit); // Add the new reply to the original tweet's reply list.
        twitRepository.save(existingTwit); // Save the updated original tweet to reflect the new reply.

        // 6. Return the newly created and saved reply tweet.
        return savedReplyTwit; // Return the created reply tweet.
    }

    @Override
    public List<Twit> getUserTwit(User user) {
        return twitRepository.findByRetwitUserContainsOrUser_IdAndIsTwitTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Twit> findByLikesContainsUser(User user) {
        return twitRepository.findByLikesUser_Id(user.getId());
    }
}
