import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import playerRouter from "./routers/player.router";
import { dbConnect } from "./configs/database.config";
dbConnect();
import userRouter from "./routers/user.router";
import matchRouter from "./routers/match.router";
import tournamentRouter from "./routers/tournament.router";
import testRouter from "./routers/test.router";
import partyRouter from "./routers/match.party.router";

const app = express();

app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/players", playerRouter);
app.use("/api/users", userRouter);
app.use("/api/matches", partyRouter);
app.use("/api/tournaments", tournamentRouter);
app.use("/api/test", testRouter);
const port = 5000;

app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
