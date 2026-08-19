package com.nandini.expense_manager.controller;

import org.springframework.web.bind.annotation.*;

import com.nandini.expense_manager.User;
import com.nandini.expense_manager.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {

        return userService.login(
            user.getUsername(),
            user.getPassword()
        );
    }
}