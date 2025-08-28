package com.kekich.productshop.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/secured")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MainController {




    @GetMapping("/user")
    public String userAccess(Principal principal) {
        if (principal == null){
            System.out.println("You are not logged in");
            return "You are not logged in";
        }
        return principal.getName();
    }
}
