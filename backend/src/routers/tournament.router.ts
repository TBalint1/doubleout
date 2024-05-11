import { Router } from "express";
import { sample_tournaments } from "../data";
import asyncHandler from "express-async-handler";
import {
  Tournament,
  TournamentModel,
  PlayersData,
} from "../models/tournament.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import jwt from "jsonwebtoken";
import { Player, PlayerModel } from "../models/player.model";
//import { Match,LEG, SCORE_HISTORY, TURN, MatchModel } from "../models/match.model";
import { Match, NewMatchModel, Turn } from "../models/newMatch.model";
import { DartsParty } from "../classes/dartsParty";
import { Stat, StatModel } from "../models/stat.model";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const playersCount = await TournamentModel.countDocuments();
    if (playersCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await TournamentModel.create(sample_tournaments);
    res.send("Seed is done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tournaments = await TournamentModel.find();
    res.send(tournaments);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const tournaments = await TournamentModel.find({
      NAME: { $regex: searchRegex },
    });
    res.send(tournaments);
  })
);

router.get(
  "/:tournamentID",
  asyncHandler(async (req, res) => {
    const tournament = await TournamentModel.findById(req.params.tournamentID);
    const matches = await NewMatchModel.find({
      tournamentId: req.params.tournamentID,
    });
    const data = {
      tournament: tournament,
      matches: matches,
    };
    res.send(data);
  })
);

// router.get(
//   "/:matchID",
//   asyncHandler(async (req, res) => {
//     const match = await MatchModel.findById(req.params.matchID);
//     res.send(match);
//   })
// );

// router.get(
//   "/:tournamentID/match/:matchID",
//   asyncHandler(async (req, res) => {
//     const match = await MatchModel.find({
//       TOURNAMENT_ID: req.params.tournamentID,
//       ID: req.params.matchID,
//     });
//     res.send(match);
//   })
// );

let dartsParty: DartsParty;

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    const { name, type, playersCount, players, points, legs, doubleOut } =
      req.body;

    const existingPlayer = await PlayerModel.findOne({ players });
    if (existingPlayer) {
      res
        .status(HTTP_BAD_REQUEST)
        .send("Player with this name already exists!");
      return;
    }

    const newTournament: Tournament = {
      id: "",
      name: req.body.name,
      type: req.body.type,
      playersCount: req.body.playersCount,
      points: req.body.points,
      legs: req.body.legs,
      doubleOut: req.body.doubleOut,
      players: req.body.players,
      currentRound: "Round 1",
      winner: "",
      runnerUp: "",
    };

    console.log("Parsed Tournament Request:", newTournament);
    const dbTournament = await TournamentModel.create(newTournament);

    let dbPlayers: Player[] = [];

    for (let i = 0; i < newTournament.playersCount; i++) {
      const newPlayer: Player = {
        id: "",
        name: newTournament.players[i].playerName,
        tournament_win: 0,
        tournament_lose: 0,
        match_win: 0,
        match_lose: 0,
      };

      const dbPlayer = await PlayerModel.create(newPlayer);
      dbPlayers.push(dbPlayer);
      console.log("Parsed Player Request:", newPlayer, i);
    }

    let dbMatches: Match[] = [];

    for (let i = 0; i < playersCount; i += 2) {
      const newMatch = new Match(
        "",
        dbTournament.id,
        "Round 1",
        req.body.legs,
        req.body.doubleOut,
        req.body.points,
        "",
        dbPlayers[i].id,
        dbPlayers[i].name,
        0,
        dbPlayers[i + 1].id,
        dbPlayers[i + 1].name,
        0,
        []
      );

      const dbMatch = await NewMatchModel.create(newMatch);
      dbMatches.push(dbMatch);
      console.log("Parsed Match Request:", newMatch);
    }

    // let dbStats: Stat[] = [];

    // for (let i = 0; i < dbMatches.length; i++) {
    //   const homeStat = new Stat(
    //     "",
    //     dbTournament.id,
    //     dbMatches[i].id,
    //     dbMatches[i].homeId,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0
    //   );

    //   const dbHomeStat = await StatModel.create(homeStat);
    //   dbStats.push(dbHomeStat);
    //   console.log("Parsed Stat Request:", homeStat);

    //   const awayStat = new Stat(
    //     "",
    //     dbTournament.id,
    //     dbMatches[i].id,
    //     dbMatches[i].awayId,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0
    //   );

    //   const dbAwayStat = await StatModel.create(awayStat);
    //   dbStats.push(dbAwayStat);
    //   console.log("Parsed Stat Request:", awayStat);
    // }

    console.log("Parsed Tournament Request:", newTournament);

    const Data = {
      tournament: dbTournament,
      players: dbPlayers,
      match: dbMatches,
    };
    res.send(Data);
  })
);

// const generateTokenReponse = (tournament: Tournament) => {
//   const token = jwt.sign(
//     {
//       name: tournament.name,
//     },
//     process.env.JWT_SECRET!,
//     {
//       expiresIn: "30d",
//     }
//   );

//   return {
//     id: tournament.id,
//     name: tournament.name,
//     type: tournament.type,
//     playersCount: tournament.playersCount,
//     match: tournament.match,
//     players: tournament.players,
//     currentRound: tournament.currentRound,
//     winner: tournament.winner,
//     runnerUp: tournament.runnerUp,
//     token: token,
//   };
// };

// const generateTokenReponseForPlayer = (players: Player) => {
//   const token = jwt.sign(
//     {
//       name: players.name,
//     },
//     process.env.JWT_SECRET!,
//     {
//       expiresIn: "30d",
//     }
//   );
//   return {
//     id: players.id,
//     name: players.name,
//     tournament_win: players.tournament_win,
//     tournament_lose: players.tournament_lose,
//     match_win: players.match_win,
//     match_lose: players.match_lose,
//     token: token,
//   };
// };

export default router;
