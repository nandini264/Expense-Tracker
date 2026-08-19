const API_URL = "http://localhost:8080/api/expenses";

// GET USER'S EXPENSES
export const getExpenses = async (userId) => {
  const response = await fetch(`${API_URL}?userId=${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }

  return response.json();
};

// ADD EXPENSE
export const addExpense = async (expense, userId) => {
  const response = await fetch(`${API_URL}?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(expense)
  });

  if (!response.ok) {
    throw new Error("Failed to add expense");
  }

  return response.json();
};

// UPDATE EXPENSE
export const updateExpense = async (id, expense, userId) => {
  const response = await fetch(
    `${API_URL}/${id}?userId=${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(expense)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update expense");
  }

  return response.json();
};

// DELETE EXPENSE
export const deleteExpense = async (id, userId) => {
  const response = await fetch(
    `${API_URL}/${id}?userId=${userId}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }

  return true;
};

// GET USER'S TOTAL EXPENSE
export const getTotalExpense = async (userId) => {
  const response = await fetch(
    `${API_URL}/total?userId=${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch total expense");
  }

  return response.json();
};