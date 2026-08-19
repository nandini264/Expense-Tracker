import React from "react";

function ExpenseItem({ expense, onDelete, onEdit }) {
  return (
    <div className="expense-item">

      <div>
        <h3>{expense.description}</h3>

        <p>
          <strong>Category:</strong> {expense.category}
        </p>

        <p>
          <strong>Payment Method:</strong>{" "}
          {expense.paymentMethod}
        </p>

        <p>
          <strong>Date:</strong> {expense.date}
        </p>
      </div>

      <div className="expense-right">

        <h3>₹{expense.amount}</h3>

        <div>
          <button
            className="edit-button"
            onClick={() => onEdit(expense)}
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => onDelete(expense.id)}
          >
            Delete
          </button>
        </div>

      </div>

    </div>
  );
}

export default ExpenseItem;