import express from "express";
import { StatusCodes } from "http-status-codes";
import { router as usersRouter } from "./src/contacts/contacts.router.js";
const app = express();
const port = 3002;
console.log(process.env.DB_NAME);
// Middleware to parse JSON request bodies
app.use(express.json());
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send({ status: "OK" });
});
app.use(usersRouter);
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
