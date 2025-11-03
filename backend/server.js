import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database/DB.js";

// Routes imports
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // renamed from loginRoute.js
import receiptRoutes from "./routes/receiptRoutes.js";

dotenv.config();
const app = express();

//  Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your React app
    credentials: true,
  })
);
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/auth", authRoutes); // handles login + signup
app.use("/api/receipt", receiptRoutes);

// Database connection and server start
(async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ alter: true }); // auto updates schema safely
    console.log("Database synced successfully (alter mode).");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is live on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
})();
