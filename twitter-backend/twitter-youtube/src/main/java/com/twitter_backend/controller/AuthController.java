package com.twitter_backend.controller;

import com.twitter_backend.config.JwtProvider;
import com.twitter_backend.exception.UserException;
import com.twitter_backend.model.User;
import com.twitter_backend.model.Varification;
import com.twitter_backend.reponse.AuthReponse;
import com.twitter_backend.repository.UserRepository;
import com.twitter_backend.service.CustomUserDetailsServiceImpl;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomUserDetailsServiceImpl customUserDetails;


    @PostMapping("/signup")
    public ResponseEntity<AuthReponse> createUserHandler(@RequestBody User user) throws UserException {

        System.out.println("user: " + user);

        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String birthDate = user.getBirthDate();

        User isEmailExits = userRepository.findByEmail(email);
        if(isEmailExits != null){
            throw new UserException("Email is already used.");
        }


        User createUser = new User();
        createUser.setEmail(email);
        createUser.setPassword(passwordEncoder.encode(password));
        createUser.setFullName(fullName);
        createUser.setBirthDate(birthDate);
        createUser.setVerification(new Varification());

        User savedUser = userRepository.save(createUser);

        // generate token which requires authentication
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateJwtToken(authentication);


        // generating new Auth reponse
        AuthReponse authReponse = new AuthReponse(token, true);
        return new ResponseEntity<>(authReponse, HttpStatus.CREATED);
    }


    @PostMapping("/signin")
    public ResponseEntity<AuthReponse> signin(@RequestBody User user) throws UserException {

        String username = user.getEmail();
        String password = user.getPassword();

        // lets authneticate this user

        Authentication authentication = authenticate(username,password);

        // now we got authentication now we matched password now just have to generate and return jwt
        String token = jwtProvider.generateJwtToken(authentication);
        // generating new Auth reponse
        AuthReponse authReponse = new AuthReponse(token, true);
        return new ResponseEntity<>(authReponse, HttpStatus.ACCEPTED);

    }

    private Authentication authenticate(String username, String password) {
            /*this method first check if user exists in datbase if exists then match the password if matched then we return authentication */

        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        if(userDetails == null){
            throw new BadCredentialsException("Invalid username.");
        }

        // match the password which user gives to already present encoded
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password.");
        }

        // if user name and password match

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }


}
