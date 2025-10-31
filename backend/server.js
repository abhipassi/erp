import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./database/DB.js";

dotenv.config();
const app = express();

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));


// models imports 
import adminRoutes from "./routes/adminRoutes.js";
import studentControllersRoutes from "./routes/studentRoutes.js";
import loginRoute from "./routes/loginRoute.js";

// Routes 
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentControllersRoutes);
app.use("/api/login", loginRoute);

// Connect to DB 
(async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connection established successfully.");

        await sequelize.sync();
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Unable to start server:", error);
    }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});
