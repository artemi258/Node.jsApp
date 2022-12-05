import express from "express";

export const userRouter = express.Router();

userRouter.use((req, res, next) => {
  console.log("Time", Date.now());
  next();
});

userRouter.post("/login", (req, res) => {
  res.send("login");
});

userRouter.post("/register", (req, res) => {
  res.send("register");
});
