import React from "react";

function ExpenseSummary({ totalExpense, expenseCount }) {
  return (
    <div className="summary-container">

      <div className="summary-card">
        <h3>Total Expenses</h3>

        <p className="summary-amount">
          ₹{Number(totalExpense).toFixed(2)}
        </p>
      </div>

      <div className="summary-card">
        <h3>Total Transactions</h3>

        <p className="summary-count">
          {expenseCount}
        </p>
      </div>

    </div>
  );
}

export default ExpenseSummary;