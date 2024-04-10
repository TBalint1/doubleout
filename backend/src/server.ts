import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import playerRouter from './routers/player.router';
import { dbConnect } from './configs/database.config';
dbConnect();
import userRouter from './routers/user.router';

const app = express();

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/players", playerRouter)
app.use("/api/users", userRouter)
const port = 5000;

app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})