import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.Routes.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(helmet());

app.use(cookieParser());

//routes

app.use("/api/v1/users", userRouter);

export default app;
