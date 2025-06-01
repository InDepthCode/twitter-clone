package com.twitter_backend.service;

import com.twitter_backend.exception.UserException;
import com.twitter_backend.model.User;

import java.util.List;

public interface UserService {


    public User findUserById(Long userId) throws UserException;

    public User findUserByJwt(String jwt) throws UserException;

    public User updateUser(Long userId, User user) throws UserException;

    // here i will send user id the user which you want to follow and user will be the req_user
    public User followUser(Long userId, User user) throws UserException;

    public List<User> searchUser(String query) throws UserException;



}
