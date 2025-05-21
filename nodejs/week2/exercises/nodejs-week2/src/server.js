import express from "express";
import { StatusCodes } from "http-status-codes";
import { router as userRouter } from "./users/users.router.js";

const app = express();
const port = 3000;

app.use(express.json());

console.log(process.env.PORT);

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send({ status: "OK" });
});

app.use(userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
