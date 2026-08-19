package com.nandini.expense_manager.service;

import org.springframework.stereotype.Service;

import com.nandini.expense_manager.User;
import com.nandini.expense_manager.repository.UserRepo;

@Service
public class UserService {

    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User register(User user) {
        return userRepo.save(user);
    }

    public User login(String username, String password) {

        User user = userRepo.findByUsername(username);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }

        return null;
    }
}