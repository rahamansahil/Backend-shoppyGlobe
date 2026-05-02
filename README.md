# 🛒 ShoppyGlobe Backend API

## 🚀 Project Overview
This is a backend API for an e-commerce website called **ShoppyGlobe**.  
It manages products, users, and shopping cart features.

This project is created for the **Internshala Full Stack Development course**.

---

## 🛠 Technologies Used
- Node.js
- Express.js
- MongoDB Atlas (Cloud Database)
- JWT (for authentication)
- Bcrypt (for password security)
- Thunder Client (for testing)

---

## 📌 Features

### 🔹 Products
- Get all products → `GET /products`
- Get single product → `GET /products/:id`

### 🔹 Authentication
- Register user → `POST /api/auth/register`
- Login user → `POST /api/auth/login`
- Uses JWT token for security

### 🔹 Cart (Protected Routes)
- Add item → `POST /cart`
- Update quantity → `PUT /cart/:id`
- Delete item → `DELETE /cart/:id`

---

## 🗄 Database
- MongoDB Atlas is used
- Collections:
  - Users
  - Products
  - Cart
