package com.twitter_backend.response;


import lombok.Data;

@Data
public class ApiResponse {
    private String message;
    private boolean status;
}
