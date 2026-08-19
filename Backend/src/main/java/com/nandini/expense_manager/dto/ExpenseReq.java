package com.nandini.expense_manager.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class ExpenseReq {

	@Positive(message="Amount must be greater than zero")
    private double amount;
    @NotBlank
    private String description;
    @NotBlank(message="category is required")
    private String category;
    
    private String paymentMethod;
    private LocalDate date;
    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    public LocalDate getDate() {
	    return date;
	}

	public void setDate(LocalDate date) {
	    this.date = date;
	}
}
