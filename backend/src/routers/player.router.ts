import { Router } from "express";
import { sample_players } from "../data";
import asyncHandler from "express-async-handler";
import { PlayerModel } from "../models/player.model";
import { NewMatchModel } from "../models/newMatch.model";
import { StatModel } from "../models/stat.model";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const playersCount = await PlayerModel.countDocuments();
    if (playersCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await PlayerModel.create(sample_players);
    res.send("Seed is done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const players = await PlayerModel.find();
    res.send(players);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const players = await PlayerModel.find({ name: { $regex: searchRegex } });
    res.send(players);
  })
);

router.get(
  "/:playerID",
  asyncHandler(async (req, res) => {
    const player = await PlayerModel.findById(req.params.playerID);
    const stats = await StatModel.find({ playerId: req.params.playerID });
    const matches = await NewMatchModel.find(
      {
        homeId: req.params.playerID,
      } || {
        awayId: req.params.playerID,
      }
    );
    const data = {
      player: player,
      stats: stats,
      matches: matches,
    };
    res.send(data);
  })
);

export default router;
