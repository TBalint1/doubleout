import { Router } from "express";
import { sample_players } from "../data";
import asyncHandler from 'express-async-handler';
import { PlayerModel } from "../models/player.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const playersCount = await PlayerModel.countDocuments();
        if(playersCount>0){
            res.send("Seed is already done!");
            return;
        }

        await PlayerModel.create(sample_players);
        res.send("Seed is done!");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const players = await PlayerModel.find();
        res.send(players);
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm,'i');
        const players = await PlayerModel.find({NAME: {$regex:searchRegex}})
        res.send(players);
    }
))

router.get("/:playerID", asyncHandler (
    async(req, res) => {
        const player = await PlayerModel.findById(req.params.playerID);
        res.send(player);
    }
))

export default router;