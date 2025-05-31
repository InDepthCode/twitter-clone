package com.twitter_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "likes") // Specifies the database table name for this entity
public class Like {

    // Unique identifier for each 'Like' record
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /*
     * @ManyToOne indicates that many 'Like' records can be associated with one 'User'.
     * This means a single user can create multiple 'Like' instances (by liking different tweets).
     * Conversely, each 'Like' record is created by only one specific 'User'.
     */
    @ManyToOne
    private User user;

    /*
     * @ManyToOne indicates that many 'Like' records can be associated with one 'Twit' (tweet).
     * This means a single 'Twit' can receive many 'Like' instances (from different users).
     * Conversely, each 'Like' record refers to only one specific 'Twit'.
     *
     * The combination of 'user' and 'twit' fields in the 'Like' entity typically ensures
     * that a user can 'like' a specific tweet only once (assuming a unique constraint
     * is applied at the database level or handled in the service layer).
     */
    @ManyToOne
    private Twit twit;
}