package com.kekich.productshop.controller;

import com.kekich.productshop.model.User;
import com.kekich.productshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/add/user")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }









}
