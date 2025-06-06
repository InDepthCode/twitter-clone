package com.twitter_backend.controller;

import com.twitter_backend.dto.UserDto;
import com.twitter_backend.exception.UserException;
import com.twitter_backend.mapper.UserDtoMapper;
import com.twitter_backend.model.User;
import com.twitter_backend.service.UserService;
import com.twitter_backend.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserByJwt(jwt);
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setReq_user(true); // Assuming 'req_user' means this is the currently authenticated user
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserProfileById(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException {
        // Renamed method to avoid ambiguity with getUserProfile()
        User reqUser = userService.findUserByJwt(jwt); // The authenticated user
        User user = userService.findUserById(userId); // The user whose profile is being requested

        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setReq_user(UserUtil.isReqUser(reqUser, user));
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser, user));
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUsers(@RequestParam String query, @RequestHeader("Authorization") String jwt) throws UserException {
        // Renamed method to be more descriptive (plural 'Users')
        User reqUser = userService.findUserByJwt(jwt); // Authenticated user context might be used in search service for personalized results
        List<User> users = userService.searchUser(query);
        List<UserDto> userDtos = UserDtoMapper.toUserDto(users); // Changed variable name to plural
        return new ResponseEntity<>(userDtos, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody User req, @RequestHeader("Authorization") String jwt) throws UserException {
        // Renamed method to clearly indicate an update operation
        User reqUser = userService.findUserByJwt(jwt); // Authenticated user
        // Important: Ensure userService.updateUser only allows updating the authenticated user's profile
        // by using reqUser.getId() as the primary identifier for the update.
        User updatedUser = userService.updateUser(reqUser.getId(), req);
        UserDto userDto = UserDtoMapper.toUserDto(updatedUser);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PutMapping("/{userId}/follow")
    public ResponseEntity<UserDto> toggleFollowUser(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException {
        // Renamed method to clearly indicate a follow/unfollow operation
        User reqUser = userService.findUserByJwt(jwt); // The user performing the follow/unfollow
        User user = userService.followUser(userId, reqUser); // Assuming followUser handles the logic for following/unfollowing
        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser, user));
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }
}