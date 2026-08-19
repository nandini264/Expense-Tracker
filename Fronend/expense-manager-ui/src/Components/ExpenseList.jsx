import React from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({
  expenses,
  onDelete,
  onEdit
}) {
  return (
    <div className="expense-list" id="expenses">

      <h2>My Expenses</h2>

      {expenses.length === 0 ? (
        <p className="no-expenses">
          No expenses found.
        </p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}

    </div>
  );
}

export default ExpenseList;