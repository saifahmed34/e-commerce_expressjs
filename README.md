# 🛍️ E-Commerce REST API  
A complete backend for an e-commerce application built with **Node.js, Express, MongoDB, JWT Authentication, Bcrypt, and Mongoose**.  
This API supports **Products, Categories, Users, Authentication, Orders**, and more.

---

## 📌 Features

### 🔐 Authentication & Authorization
- Register/Login users  
- Password hashing using **bcryptjs**  
- JWT authentication  
- Admin-only protected routes  
- Custom middleware using **express-jwt**

### 🛒 Product Management
- Create, read, update, delete products  
- Filter featured products  
- Product count endpoint  
- Category population  
- Full CRUD functionality

### 🗂️ Category Management
- Create, read, update, delete categories  
- Public GET routes (no authentication required)

### 🧑‍💼 User Management
- Register new users  
- Login users  
- Fetch all users or specific user  
- Password hashing  
- Admin role support

### 📦 Orders & Order Items
- Create orders with related order items  
- Populate user + order item data  
- Update or delete orders  
- Auto-delete order items when deleting an order

### 🔐 JWT Middleware
- Protect API routes  
- Allow public routes (`login`, `register`, product/category GET)  
- Revokes token when user is not admin  

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express.js | API framework |
| MongoDB | NoSQL database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |

---
## 📁 Project Structure

ecommerce-api/
│
├─ auth/
│  └─ jwt.js
│
├─ models/
│  ├─ Category.js
│  ├─ Order.js
│  ├─ Orderitem.js
│  ├─ Products.js
│  └─ User.js
│
├─ routes/
│  ├─ category.js
│  ├─ order.js
│  ├─ Product.js
│  └─ users.js
│
├─ server.js
└─ README.md


---

## ⚙️ Environment Variables

Create a `.env` file in the root:
```
secret=YOUR_JWT_SECRET_KEY
Api_Url=/api/v1
db=mongodb+srv://your-mongo-url
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the project
```sh
git clone https://github.com/yourusername/ecommerce-api
cd ecommerce-api
```
### 2️⃣ Install dependencies
```
npm install
```
### 3️⃣ Create .env
```
secret=abc123
Api_Url=/api/v1
db=mongodb://localhost:27017/ecommerce
```
### 4️⃣ Start the server
```
npm start
```
Server will run at:
http://localhost:3000

## 📡 API Endpoints

---

### 🔐 Users (Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users/register` | Register a new user |
| POST | `/api/v1/users/login` | Login user and get JWT token |
| GET | `/api/v1/users` | Get all users (admin only) |
| GET | `/api/v1/users/:id` | Get a single user by ID |

---

### 🗂️ Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/Category` | Get all categories |
| GET | `/api/v1/Category/:id` | Get a single category |
| POST | `/api/v1/Category` | Create a new category |
| PUT | `/api/v1/Category/:id` | Update a category by ID |
| DELETE | `/api/v1/Category/:id` | Delete a category by ID |

---

### 🛒 Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/product` | Get all products |
| GET | `/api/v1/product/count` | Get total number of products |
| GET | `/api/v1/product/feautre` | Get all featured products |
| GET | `/api/v1/product/:id` | Get a single product by ID |
| POST | `/api/v1/product` | Create a new product |
| PUT | `/api/v1/product/:id` | Update a product by ID |
| DELETE | `/api/v1/product/:id` | Delete a product by ID |

---

### 📦 Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/order` | Get all orders |
| POST | `/api/v1/order` | Create a new order (with order items) |
| PUT | `/api/v1/order/:id` | Update an order by ID |
| DELETE | `/api/v1/order/:id` | Delete an order and its associated order items |

🔐 JWT Authorization

Protected routes require:
```
Authorization: Bearer <your_token>
```

Middleware:

Blocks requests without valid token

Allows public endpoints

Denies non-admin users for admin operations

### 👨‍💻Author

Saif El-Din Ahmed
Backend Developer
