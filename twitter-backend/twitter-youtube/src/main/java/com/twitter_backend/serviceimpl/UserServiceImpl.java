package com.twitter_backend.serviceimpl;

import com.twitter_backend.config.JwtProvider;
import com.twitter_backend.exception.UserException;
import com.twitter_backend.model.User;
import com.twitter_backend.repository.UserRepository;
import com.twitter_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserById(Long userId) throws UserException {
        // Finds a user by their ID, throwing an exception if not found.
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException("User Not Found with ID: " + userId));
        return user;
    }

    @Override
    public User findUserByJwt(String jwt) throws UserException {
        // Extracts email from JWT, then finds and returns the corresponding user, throwing an exception if not found.
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);

        if(user == null){
            throw new UserException("User Not Found with email: " + email);
        }

        return user;
    }

    @Override
    public User updateUser(Long userId, User reqUser) throws UserException {
        // Updates a user's profile information based on provided changes for the given userId.
        User user = findUserById(userId);

        if(reqUser.getFullName() != null){
            user.setFullName(reqUser.getFullName());
        }
        if(reqUser.getImage() != null){
            user.setImage(reqUser.getImage());
        }

        if(reqUser.getBackGroundImage() != null){
            user.setBackGroundImage(reqUser.getBackGroundImage());
        }

        if(reqUser.getBirthDate() != null){
            user.setBirthDate(reqUser.getBirthDate());
        }
        if(reqUser.getLocation() != null){
            user.setLocation(reqUser.getLocation());
        }

        if(reqUser.getBio() != null){
            user.setBio(reqUser.getBio());
        }
        if(reqUser.getWebsite() != null){
            user.setWebsite(reqUser.getWebsite());
        }

        return userRepository.save(user);
    }

    @Override
    public User followUser(Long followtouserId, User reqUser) throws UserException {
        // Toggles a user's follow status: If already following, unfollows; otherwise, initiates a follow.
        User followToUser = findUserById(followtouserId);

        if(reqUser.getFollowings().contains(followToUser)){ // Simplified condition
            // UNFOLLOW: Remove each user from the other's respective lists.
            reqUser.getFollowings().remove(followToUser);
            followToUser.getFollowers().remove(reqUser);
        }
        else{
            // FOLLOW: Add each user to the other's respective lists.
            reqUser.getFollowings().add(followToUser);
            followToUser.getFollowers().add(reqUser);
        }

        userRepository.save(followToUser);
        userRepository.save(reqUser);

        return followToUser;
    }

    @Override
    public List<User> searchUser(String query) throws UserException {
        // Searches for users whose names or other attributes match the given query string.
        return userRepository.searchUser(query);
    }
}