package com.twitter_backend.controller;


import com.twitter_backend.dto.LikeDto;
import com.twitter_backend.exception.TwitException;
import com.twitter_backend.exception.UserException;
import com.twitter_backend.mapper.LikeDtoMapper;
import com.twitter_backend.model.Like;
import com.twitter_backend.model.User;
import com.twitter_backend.service.LikeService;
import com.twitter_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LikeController {

    @Autowired
    private UserService userService;
    @Autowired
    private LikeService likeService;


    // to like tweet
    @PostMapping("/{twitId}/likes")
    public ResponseEntity<LikeDto> likeTwit(@PathVariable long twitId, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserByJwt(jwt);
        Like like = likeService.likeTwit(twitId, user);
        LikeDto likeDto = LikeDtoMapper.toLikeDto(like,user);
        return new ResponseEntity<>(likeDto, HttpStatus.OK);
    }



    @PostMapping("/{twitId}/likes")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable long twitId, @RequestHeader("Authorization") String jwt) throws UserException, TwitException {
        User user = userService.findUserByJwt(jwt);
        List<Like> like = likeService.getAllLikes(twitId);
        List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(like,user);
        return new ResponseEntity<>(likeDtos, HttpStatus.OK);
    }




}
