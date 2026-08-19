package com.nandini.expense_manager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nandini.expense_manager.Expense;
import com.nandini.expense_manager.User;
import com.nandini.expense_manager.dto.ExpenseReq;
import com.nandini.expense_manager.repository.ExpenseRepo;
import com.nandini.expense_manager.repository.UserRepo;

@Service
public class ExpenseService {

    private final ExpenseRepo exprep;
    private final UserRepo userRepo;

    public ExpenseService(ExpenseRepo exprep, UserRepo userRepo) {
        this.exprep = exprep;
        this.userRepo = userRepo;
    }

    // ADD EXPENSE
    public Expense addExp(ExpenseReq request, int userId) {

        User user = userRepo.findById(userId).orElse(null);

        if (user == null) {
            return null;
        }

        Expense expense = new Expense();

        expense.setAmount(request.getAmount());
        expense.setDescription(request.getDescription());
        expense.setCategory(request.getCategory());
        expense.setPaymentMethod(request.getPaymentMethod());
        expense.setDate(request.getDate());

        expense.setUser(user);

        return exprep.save(expense);
    }

    // GET USER'S EXPENSES
    public List<Expense> getAllExpenses(int userId) {

        User user = userRepo.findById(userId).orElse(null);

        if (user == null) {
            return List.of();
        }

        return exprep.findByUser(user);
    }

    // GET EXPENSE BY ID
    public Expense getExpenseById(int id, int userId) {

        Expense expense = exprep.findById(id).orElse(null);

        if (expense == null) {
            return null;
        }

        if (expense.getUser().getId() != userId) {
            return null;
        }

        return expense;
    }

    // UPDATE EXPENSE
    public Expense updateExpense(int id, Expense updatedExpense, int userId) {

        Expense existingExpense = exprep.findById(id).orElse(null);

        if (existingExpense == null) {
            return null;
        }

        if (existingExpense.getUser().getId() != userId) {
            return null;
        }

        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setDescription(updatedExpense.getDescription());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setPaymentMethod(updatedExpense.getPaymentMethod());
        existingExpense.setDate(updatedExpense.getDate());

        return exprep.save(existingExpense);
    }

    // DELETE EXPENSE
    public boolean deleteExpense(int id, int userId) {

        Expense expense = exprep.findById(id).orElse(null);

        if (expense == null) {
            return false;
        }

        if (expense.getUser().getId() != userId) {
            return false;
        }

        exprep.delete(expense);

        return true;
    }

    // TOTAL EXPENSE FOR USER
    public Double getTotalExpense(int userId) {

        User user = userRepo.findById(userId).orElse(null);

        if (user == null) {
            return 0.0;
        }

        return exprep.getTotalExpense(user);
    }
}