# Expense Tracker

A full-stack Expense Tracker application built using React.js, Spring Boot, and MySQL.

## How to Run the Project

### Prerequisites

- Java 17 or above
- Node.js and npm
- MySQL
- Eclipse / Spring Tool Suite / IntelliJ IDEA

### 1. Clone the Repository

```bash
git clone https://github.com/nandini264/Expense-Tracker.git
cd Expense-Tracker
````

### 2. Setup MySQL

Make sure MySQL is installed and running.

Create the database:

```sql
CREATE DATABASE expense_manager;
```

Update the MySQL username and password in:

`Backend/src/main/resources/application.properties`

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_manager
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

Replace `YOUR_PASSWORD` with your MySQL password.

### 3. Run the Backend

Open the `Backend` folder in Eclipse, Spring Tool Suite, or IntelliJ IDEA.

Run:

`ExpenseManagerApplication.java`

The backend will run at:

`http://localhost:8080`

### 4. Run the Frontend

Open a new terminal and run:

```bash
cd Fronend
npm install
npm run dev
```

The frontend will run at:

`http://localhost:5173`

Open the URL in your browser.

### 5. Use the Application

* Register a new account.
* Login using your credentials.
* Add expenses.
* View your expenses and total amount.
* Update or delete expenses.
* Logout when finished.

```

