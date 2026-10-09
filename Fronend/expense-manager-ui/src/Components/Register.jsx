import React, { useState } from "react";

function Register({ onRegister }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.ok) {
        alert("Registration successful!");
        onRegister();
      } else {
        alert("Registration failed");
      }

    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="login-container">

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;