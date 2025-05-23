package com.twitter_backend.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Like {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @ManyToOne // one user can only like one post means one post can have multiple users
    private User user;



    @ManyToOne //tweet will be liked only once but by multiple user
    private Twit twit;
}
