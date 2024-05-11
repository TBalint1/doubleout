import { Router } from "express";
import { sample_matches } from "../data";
import asyncHandler from "express-async-handler";
import {
  LEG,
  Match,
  MatchModel,
  SCORE_HISTORY,
  TURN,
} from "../models/match.model";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const playersCount = await MatchModel.countDocuments();
    if (playersCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await MatchModel.create(sample_matches);
    res.send("Seed is done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const matches = await MatchModel.find();
    res.send(matches);
  })
);

router.get(
  "/:matchID",
  asyncHandler(async (req, res) => {
    const match = await MatchModel.findById(req.params.matchID);
    res.send(match);
  })
);

router.get(
  "/:playerID",
  asyncHandler(async (req, res) => {
    const player = await MatchModel.findById(req.params.playerID);
    res.send(player);
  })
);

// router.route("/:matchID/throw/:playerID", asyncHandler) (
//     .get(async(req, res) => {
//         const match = await MatchModel.findById(req.params.matchID);
//         res.send(match);
//     })

//     .post(async(req, res) => {
//         const player = await MatchModel.findById(req.params.matchID);
//         res.send(player);
//     })

//     .put(async(req, res) => {
//         const player = await MatchModel.findById(req.params.matchID);
//         res.send(player);
//     })
// )

const playDarts = (
  turn: TURN,
  score_history: SCORE_HISTORY,
  leg: LEG,
  match: Match
) => {
  let bust = false;
  leg.SERVICE_PLAYER = match.HOME_ID;
  leg.COUNT = 1;
  match.HOME_SCORE = 0;
  match.AWAY_SCORE = 0;

  while (
    match.HOME_SCORE < match.FIRST_TO ||
    match.AWAY_SCORE < match.FIRST_TO
  ) {
    score_history.PLAYER = leg.SERVICE_PLAYER;
    leg.COUNT++;
  }
};

export default router;
