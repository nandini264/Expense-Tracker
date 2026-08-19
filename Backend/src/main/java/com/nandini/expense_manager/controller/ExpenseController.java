package com.nandini.expense_manager.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nandini.expense_manager.Expense;
import com.nandini.expense_manager.dto.ExpenseReq;
import com.nandini.expense_manager.service.ExpenseService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expser;

    public ExpenseController(ExpenseService expser) {
        this.expser = expser;
    }

    @PostMapping
    public Expense addExpense(
            @Valid @RequestBody ExpenseReq expr,
            @RequestParam int userId) {

        return expser.addExp(expr, userId);
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses(
            @RequestParam int userId) {

        return ResponseEntity.ok(
                expser.getAllExpenses(userId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(
            @PathVariable int id,
            @RequestParam int userId) {

        Expense expense = expser.getExpenseById(id, userId);

        if (expense == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(expense);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable int id,
            @RequestParam int userId,
            @RequestBody Expense exp) {

        Expense updatedExpense =
                expser.updateExpense(id, exp, userId);

        if (updatedExpense == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedExpense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable int id,
            @RequestParam int userId) {

        boolean deleted =
                expser.deleteExpense(id, userId);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/total")
    public Double getTotalExpense(
            @RequestParam int userId) {

        return expser.getTotalExpense(userId);
    }
}