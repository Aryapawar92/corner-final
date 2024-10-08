import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.Routes.js";

const app = express();

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(helmet());

app.use(cookieParser());

//routes

app.use("/api/v1/users", userRouter);

export default app;
