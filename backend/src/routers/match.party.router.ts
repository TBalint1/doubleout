import { Router } from "express";
import { sample_matches } from "../data";
import asyncHandler from "express-async-handler";
import { Leg, Match, NewMatchModel, Turn } from "../models/newMatch.model";
import { DartsParty } from "../classes/dartsParty";
import { Stat, StatModel } from "../models/stat.model";

const router = Router();

let dartsParty: DartsParty;

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const playersCount = await NewMatchModel.countDocuments();
    if (playersCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await NewMatchModel.create(sample_matches);
    res.send("Seed is done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const matches = await NewMatchModel.find();
    res.send(matches);
  })
);

router.get(
  "/:matchID",
  asyncHandler(async (req, res) => {
    const match = await NewMatchModel.findById(req.params.matchID);
    const stats = await StatModel.find({ matchId: req.params.matchID });
    const data = {
      match: match,
      stats: stats,
    };
    res.send(data);
  })
);

// router.post(
//   "/start",
//   asyncHandler(async (req, res) => {
//     const match = new Match(
//       "testID",
//       "testTournamentID",
//       "round1",
//       1,
//       false,
//       501,
//       "",
//       "homeId",
//       "Zolix",
//       0,
//       "awayId",
//       "Taki",
//       0,
//       []
//     );
//     const homeStat = StatModel.find({ playerId: match.homeId });
//     const awayStat = StatModel.find({ playerId: match.awayId });
//     console.log(homeStat, awayStat);

//     dartsParty = new DartsParty(match);
//     const result = dartsParty.start();

//     console.log(result);
//     res.send(result);
//   })
// );

router.put(
  "/:matchID/onGoing",
  asyncHandler(async (req, res) => {
    console.log(req.params.matchID);
    const match = await NewMatchModel.findById(req.params.matchID);
    let dbStats: Stat[] = [];

    if (match === null) {
      console.log("null");
    } else {
      console.log("van mérkőzés");
      const homeStat = new Stat(
        "",
        match.tournamentId,
        match.id,
        match.homeId,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      );

      let dbHomeStat = await StatModel.create(homeStat);
      dbStats.push(dbHomeStat);

      console.log("Parsed Stat Request:", homeStat);

      const awayStat = new Stat(
        "",
        match.tournamentId,
        match.id,
        match.awayId,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      );

      const dbAwayStat = await StatModel.create(awayStat);
      dbStats.push(dbAwayStat);
      //const homeStat = StatModel.findOne({ playerId: match.homeId });
      //const awayStat = StatModel.findOne({ playerId: match.awayId });
      dartsParty = new DartsParty(match, homeStat, awayStat);
    }
    console.log(match);
    try {
      console.log("in try");
      const matchID = req.params.matchID;

      // Mérkőzés adatainak frissítése a DartsParty segítségével
      const updatedMatch = await dartsParty.start();
      console.log(updatedMatch);

      const data = {
        match: updatedMatch,
        stats: dbStats,
      };

      // Mérkőzés frissítése az adatbázisban
      await NewMatchModel.findByIdAndUpdate(matchID, updatedMatch);
      res.send(data); // Visszaküldjük a frissített mérkőzés adatait
    } catch (error) {
      console.error("Hiba történt a mérkőzés frissítése során:", error);
      res.status(500).send("Hiba történt a mérkőzés frissítése során.");
    }
  })
);

// router.put(
//   "/:matchID/onGoing",
//   asyncHandler(async (req, res) => {
//     const match = router.get(
//       "/:matchID",
//       asyncHandler(async (req, res) => {
//         const match = await NewMatchModel.findById(req.params.matchID);
//         res.send(match);
//       })
//     );
//     console.log(match);
//     // if (match?.winner === "") {
//     //   dartsParty = new DartsParty(match);
//     //   const result = dartsParty.start();
//     //   console.log(result);
//     //   res.send(result);
//     // } else {
//     //   res.send(match);
//     // }
//     dartsParty = new DartsParty(match);
//   })
// );

router.put(
  "/:matchID/onGoing/throw",
  asyncHandler(async (req, res) => {
    console.log(dartsParty);
    const match = await NewMatchModel.findById(req.params.matchID);
    const {
      playerID,
      throw1Sector,
      throw1Multiplier,
      throw2Sector,
      throw2Multiplier,
      throw3Sector,
      throw3Multiplier,
    } = req.body;
    const turn = new Turn(
      req.body.playerID,
      req.body.throw1Sector,
      req.body.throw1Multiplier,
      req.body.throw2Sector,
      req.body.throw2Multiplier,
      req.body.throw3Sector,
      req.body.throw3Multiplier
    );
    console.log(turn);
    const state = dartsParty.thrown(turn);
    const stat = dartsParty.calculateStatistics(turn);
    console.log(state);
    if (state !== undefined) {
      await NewMatchModel.findByIdAndUpdate(req.params.matchID, state);
      console.log(stat);
      console.log(req.body.playerID);
      await StatModel.findOneAndUpdate(
        { playerId: req.body.playerID, matchId: req.params.matchID },
        stat
      );
      const data = {
        match: state,
        stat: stat,
      };
      res.send(data);
    } else {
      res.send("Invalid turn!");
    }
  })
);

export default router;
