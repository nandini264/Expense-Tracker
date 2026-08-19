import React, { useEffect, useState } from "react";

function ExpenseForm({
  onExpenseAdded,
  onExpenseUpdated,
  editingExpense
}) {
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    category: "",
    paymentMethod: "",
    date: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setExpense({
        description: editingExpense.description || "",
        amount: editingExpense.amount || "",
        category: editingExpense.category || "",
        paymentMethod: editingExpense.paymentMethod || "",
        date: editingExpense.date
          ? editingExpense.date.substring(0, 10)
          : ""
      });
    } else {
      setExpense({
        description: "",
        amount: "",
        category: "",
        paymentMethod: "",
        date: ""
      });
    }

    setError("");
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExpense((previousExpense) => ({
      ...previousExpense,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !expense.description ||
      !expense.amount ||
      !expense.category ||
      !expense.paymentMethod ||
      !expense.date
    ) {
      setError("Please fill all fields");
      return;
    }

    try {
      const expenseData = {
        description: expense.description,
        amount: Number(expense.amount),
        category: expense.category,
        paymentMethod: expense.paymentMethod,
        date: expense.date
      };

      if (editingExpense) {
        await onExpenseUpdated(
          editingExpense.id,
          expenseData
        );
      } else {
        await onExpenseAdded(expenseData);
      }

      setExpense({
        description: "",
        amount: "",
        category: "",
        paymentMethod: "",
        date: ""
      });

    } catch (error) {
      console.error(error);

      setError(
        editingExpense
          ? "Failed to update expense"
          : "Failed to add expense"
      );
    }
  };

  return (
    <div className="expense-form-container">

      <h2>
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>

          <input
            type="text"
            name="description"
            value={expense.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        {/* Amount */}
        <div className="form-group">
          <label>Amount</label>

          <input
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={expense.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Payment Method */}
        <div className="form-group">
          <label>Payment Method</label>

          <select
            name="paymentMethod"
            value={expense.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button type="submit">
          {editingExpense
            ? "Update Expense"
            : "Add Expense"}
        </button>

      </form>
    </div>
  );
}

export default ExpenseForm;