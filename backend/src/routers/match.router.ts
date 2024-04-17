import { Router } from "express";
import { sample_matches } from "../data";
import asyncHandler from 'express-async-handler';
import { MatchModel } from "../models/match.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const playersCount = await MatchModel.countDocuments();
        if(playersCount>0){
            res.send("Seed is already done!");
            return;
        }

        await MatchModel.create(sample_matches);
        res.send("Seed is done!");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const players = await MatchModel.find();
        res.send(sample_matches);
    }
))

router.get("/:playerID", asyncHandler (
    async(req, res) => {
        const player = await MatchModel.findById(req.params.playerID);
        res.send(player);
    }
))

export default router;