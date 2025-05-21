import express from "express";
import { StatusCodes } from "http-status-codes";
import { knexInstance } from "./database.js";

export const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await knexInstance.select().from("users");
  res.status(StatusCodes.OK).json(users);
});

router.post("/users", async (req, res) => {
  const [userId] = await knexInstance.insert(req.body);
  res.status(StatusCodes.CREATED).json(userId);
});
