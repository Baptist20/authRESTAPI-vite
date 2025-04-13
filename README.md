# 🔐 Auth API with Password Reset — Node.js, Express, MongoDB

A secure authentication API built with Node.js, Express, and MongoDB. Features user registration, login, logout, and a password reset system using email tokens.

## 🚀 Features

- User registration & login with JWT and HttpOnly cookies
- Password hashing with bcrypt
- Forgot password flow with token-based reset
- Secure email sending using Nodemailer
- Global error handling with support for custom error classes

---

## 📁 Project Structure

```
project-root/
├── controllers/        # Auth logic (register, login, reset)
├── models/             # User model with hashed passwords
├── routes/             # Auth API routes
├── utils/              # Email sender & CustomError class
├── middleware/         # Global error handler
├── .env                # Environment variables
├── server.js           # App entry point
```

---

## ⚙️ Environment Variables (`.env`)

```
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
```

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/auth-api.git
   cd auth-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup `.env` file as shown above.

4. Run the server:
   ```bash
   npm run dev
   ```

---

## 🛠️ API Endpoints

| Method | Endpoint                          | Description                |
| ------ | --------------------------------- | -------------------------- |
| POST   | `/api/auth/register`              | Register a new user        |
| POST   | `/api/auth/login`                 | Login a user               |
| POST   | `/api/auth/logout`                | Clear JWT cookie           |
| POST   | `/api/auth/forgot-password`       | Send password reset email  |
| POST   | `/api/auth/reset-password/:token` | Reset password using token |

---

## 🔒 Technologies Used

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT (JSON Web Token)**
- **bcryptjs**
- **Nodemailer**
- **express-async-errors**

---

## ✅ Custom Error Handling

All async errors are automatically forwarded to a global error handler. You can also throw custom errors using:

```js
throw new CustomError("Not found", 404);
```

This ensures your responses stay consistent and informative.

---

## 📧 Email Setup (Gmail Users)

Use an [App Password](https://support.google.com/accounts/answer/185833?hl=en) if you have 2FA enabled.

---

## 📌 License

This project is open-source and free to use under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ by Baptist
