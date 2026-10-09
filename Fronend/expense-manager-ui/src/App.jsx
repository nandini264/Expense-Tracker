import React, { useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import ExpenseSummary from "./Components/ExpenseSummary";

import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getTotalExpense
} from "./services/expenseService";

import Register from "./Components/Register";
import Login from "./Components/Login";
import "./App.css";

function App() {

  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // LOAD DATA
  useEffect(() => {

    if (currentUser) {
      loadData();
    }

  }, [currentUser]);


  const loadData = async () => {

    try {

      setLoading(true);

      const expensesData = await getExpenses(currentUser.id);

      const totalData = await getTotalExpense(currentUser.id);

      setExpenses(expensesData);

      setTotalExpense(totalData || 0);

      setError("");

    } catch (error) {

      console.error(error);

      setError("No expenses to show");

    } finally {

      setLoading(false);

    }
  };


  // ADD EXPENSE
  const handleAddExpense = async (expense) => {

    try {

      await addExpense(expense, currentUser.id);

      await loadData();

    } catch (error) {

      console.error(error);

      throw error;
    }
  };


  // EDIT EXPENSE
  const handleEditExpense = (expense) => {

    setEditingExpense(expense);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // UPDATE EXPENSE
  const handleUpdateExpense = async (id, expense) => {

    try {

      await updateExpense(id, expense, currentUser.id);

      setEditingExpense(null);

      await loadData();

    } catch (error) {

      console.error(error);

      throw error;
    }
  };


  // DELETE EXPENSE
  const handleDeleteExpense = async (id) => {

    try {

      await deleteExpense(id, currentUser.id);

      await loadData();

    } catch (error) {

      console.error(error);

      setError("Failed to delete expense");
    }
  };


  // LOGIN / REGISTER SCREEN
  if (!loggedIn) {

    if (showRegister) {

      return (
        <Register
          onRegister={() => setShowRegister(false)}
        />
      );

    }

    return (
      <Login
        onLogin={(user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        }}
        onRegister={() => setShowRegister(true)}
      />
    );
  }


  // EXPENSE MANAGER
  return (
    <div className="app">

      <Navbar
  onLogout={() => {
    setLoggedIn(false);
    setCurrentUser(null);
    setExpenses([]);
    setTotalExpense(0);
  }}
/>

      <main className="main-container">

        <h1>Expense Manager</h1>

        <p className="subtitle">
          Track and manage your expenses easily
        </p>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <ExpenseSummary
          totalExpense={totalExpense}
          expenseCount={expenses.length}
        />

        <ExpenseForm
          onExpenseAdded={handleAddExpense}
          onExpenseUpdated={handleUpdateExpense}
          editingExpense={editingExpense}
        />

        {loading ? (

          <p className="loading">
            Loading expenses...
          </p>

        ) : (

          <ExpenseList
            expenses={expenses}
            onDelete={handleDeleteExpense}
            onEdit={handleEditExpense}
          />

        )}

      </main>

    </div>
  );
}

export default App;