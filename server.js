const express = require("express");
require("express-async-errors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();

//Middleware
app.use(express.json());
dotenv.config();
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use(cookieParser());

//db
const connectDB = require("./db");

// files
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./Error/errorHandler");
const userRoute = require("./routes/userRoute");

// connect to mongodb
connectDB();

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoute);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
