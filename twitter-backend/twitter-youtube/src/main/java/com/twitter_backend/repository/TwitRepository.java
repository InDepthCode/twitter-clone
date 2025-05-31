package com.twitter_backend.repository;

import com.twitter_backend.model.Twit;
import com.twitter_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TwitRepository extends JpaRepository<Twit, Long> {


    /*

    Finds all original tweets (where 'isTwit' is true), ordering them by their creation date from newest to oldest;

   */
    List<Twit> findAllByIsTwitTrueOrderByCreatedAtDesc();



    /*
    * Finds all tweets that either a specific user retweeted OR were originally posted by a specific user (and are actual tweets and not the retweets), ordered by creation date from newest to oldest;
    *
    * */
    List<Twit> findByRetwitUserContainsOrUser_IdAndIsTwitTrueOrderByCreatedAtDesc(User user, Long userId);


    /* Finds all tweets that a specific user has liked, ordered by their creation date from newest to oldest.
    *
    * if a user liked the 10 tweets i want the list of those 10 tweets
    *
    * */

    List<Twit> findByLikesContainingOrderByCreatedAtDesc(User user);



    /*
     * Basically, this query helps you find all the posts (tweets) that a particular person has hit the "like" button on.
     */

    @Query("select t from Twit t join t.likes l where l.user.id =:userId")
    List<Twit> findByLikesUser_Id(@Param("userId")Long userId);
}
