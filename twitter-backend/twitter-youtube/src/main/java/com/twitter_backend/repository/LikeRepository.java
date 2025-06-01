package com.twitter_backend.repository;

import com.twitter_backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {


    @Query("select userLike from Like userLike where userLike.user.id = :userId and userLike.twit.id = :twitId")
    public Like isLikeExits(@Param("userId") Long userId, @Param("twitId") Long twitId); // Checks if a specific user has already liked a specific tweet.

    @Query("select individualLike from Like individualLike where individualLike.twit.id = :twitId")
    public List<Like> findAllLikesForTwit(@Param("twitId") Long twitId); // Retrieves all like records for a given tweet ID.

    List<Like> findByTwit_Id(Long twitId);
}