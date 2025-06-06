package com.twitter_backend.controller;


import com.twitter_backend.dto.TwitDto;
import com.twitter_backend.exception.TwitException;
import com.twitter_backend.exception.UserException;
import com.twitter_backend.mapper.TwitDtoMapper;
import com.twitter_backend.model.Twit;
import com.twitter_backend.model.User;
import com.twitter_backend.request.TwitReplyRequest;
import com.twitter_backend.response.ApiResponse;
import com.twitter_backend.service.TwitService;
import com.twitter_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/twits")
public class TwitController {

    @Autowired
    private TwitService twitService;

    @Autowired
    private UserService userService;


    @PostMapping("/create")
    public ResponseEntity<TwitDto> createTwit(@RequestBody Twit req, @RequestHeader("Authorization")String jwt) throws UserException, TwitException {
        User user = userService.findUserByJwt(jwt);
        Twit twit = twitService.createTwit(req, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }


    @PostMapping("/reply")
    public ResponseEntity<TwitDto> replyTwit(@RequestBody TwitReplyRequest req, @RequestHeader("Authorization")String jwt) throws UserException, TwitException {
        User user = userService.findUserByJwt(jwt);
        Twit twit = twitService.createReply(req, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }


    @PutMapping("/{twitid}/retwit")
    public ResponseEntity<TwitDto> retwit(@PathVariable Long twitid, @RequestHeader("Authorization")String jwt) throws UserException, TwitException {
        User user = userService.findUserByJwt(jwt);
        Twit twit = twitService.retwit(twitid, user);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.ACCEPTED);
    }


    @GetMapping("/{twitid}")
    public ResponseEntity<TwitDto> findTwitById(@PathVariable Long twitid, @RequestHeader("Authorization")String jwt) throws UserException, TwitException {
        User user = userService.findUserByJwt(jwt);
        Twit twit = twitService.findById(twitid);
        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @DeleteMapping("/{twitid}")
    public ResponseEntity<ApiResponse> deleteTwit(@PathVariable Long twitid, @RequestHeader("Authorization")String jwt) throws UserException, TwitException {
        User user = userService.findUserByJwt(jwt);
        twitService.deleteTwitById(twitid , user.getId());
        ApiResponse res = new ApiResponse();
        res.setMessage("Tweet deleted successfuly");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("/")
    public ResponseEntity<List<TwitDto>> getAllTwit(@RequestHeader("Authorization")String jwt) throws UserException, TwitException {
        User user = userService.findUserByJwt(jwt);
       List<Twit>  twits = twitService.findAllTwit();
       List<TwitDto> twitDto = TwitDtoMapper.toTwitDtoList(twits, user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TwitDto>> getUserAllTwit(@PathVariable Long userId, @RequestHeader("Authorization")String jwt) throws UserException, TwitException {
        User user = userService.findUserByJwt(jwt);
        List<Twit>  twits = twitService.getUserTwit(user);
        List<TwitDto> twitDto = TwitDtoMapper.toTwitDtoList(twits, user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TwitDto>> findTwitByLikeContainsUser(@PathVariable Long userId, @RequestHeader("Authorization")String jwt) throws UserException, TwitException {
        User user = userService.findUserByJwt(jwt);
        List<Twit>  twits = twitService.findByLikesContainsUser(user);
        List<TwitDto> twitDto = TwitDtoMapper.toTwitDtoList(twits, user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }





}
