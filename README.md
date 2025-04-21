# 🏥 Medical Card Transaction Management System

A web application for **XYZ Company** to manage medical card transactions of their **ex-employees**.

---

## 📌 Project Overview

XYZ provides medical cards with a fixed balance to their ex-employees. This platform helps manage card transactions and employee data efficiently through dedicated **User** and **Admin** panels.

---

## 👨‍💻 Features

### 🔐 Authentication
- Secure login with roles: `USER` and `ADMIN`.
- Role-based redirection after login.

---

### 👤 User Panel
Accessible only to users with the role `USER`.

Displays:
- **Personal Information**:
  - Name
  - Employee Code
  - Address
  - Medical Card Number

- **Transaction Table**:
  - Claimed Amount
  - Passed Amount
  - Month
  - Year
  - Remarks

---

### 🛠️ Admin Panel
Accessible only to users with the role `ADMIN`.

#### 1. ➕ Add Employee
- Add a new ex-employee to the system.

#### 2. ✏️ Update Employee
- Update or modify any details of an existing employee.

#### 3. 📤 Transaction Dump
- Upload a `.csv` or `.xlsx` file containing multiple transaction records.
- Automatically insert parsed data into the database.

> ⚠️ Assumes a pre-existing database of ex-employees with testing data for development.

---

## 🧩 Tech Stack

| Layer      | Technology Used                  |
|------------|----------------------------------|
| Frontend   | React.js, Tailwind CSS |
| Backend    | Node.js, Express.js              |
| Database   | MongoDB (via Mongoose)  |
| File Upload| Multer, csv-parser / xlsx        |
| Auth       | JWT, bcryptjs                    |

---

