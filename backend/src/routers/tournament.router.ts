import { Router } from "express";
import { sample_tournaments } from "../data";
import asyncHandler from "express-async-handler";
import { Tournament, TournamentModel } from "../models/tournament.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { Player, PlayerModel } from "../models/player.model";
import { Match, NewMatchModel, Turn } from "../models/newMatch.model";
import { DartsParty } from "../classes/dartsParty";
import { StatModel } from "../models/stat.model";

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
      name: { $regex: searchRegex },
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
    const stats = await StatModel.find({
      tournamentId: req.params.tournamentID,
    });
    const data = {
      tournament: tournament,
      matches: matches,
      stats: stats,
    };
    res.send(data);
  })
);

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

    console.log("Parsed Tournament Request:", newTournament);

    const Data = {
      tournament: dbTournament,
      players: dbPlayers,
      match: dbMatches,
    };
    res.send(Data);
  })
);

export default router;
