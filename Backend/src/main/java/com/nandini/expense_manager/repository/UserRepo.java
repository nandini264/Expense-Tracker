package com.nandini.expense_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nandini.expense_manager.User;

public interface UserRepo extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}