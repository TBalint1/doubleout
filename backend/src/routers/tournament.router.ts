import { Router } from "express";
import { sample_tournaments } from "../data";
import asyncHandler from 'express-async-handler';
import { Tournament, TournamentModel, MatchSettings, PlayersData } from "../models/tournament.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import jwt from 'jsonwebtoken';
import { Player, PlayerModel } from "../models/player.model";
import { Match,LEG, SCORE_HISTORY, TURN } from "../models/match.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const playersCount = await TournamentModel.countDocuments();
        if(playersCount>0){
            res.send("Seed is already done!");
            return;
        }

        await TournamentModel.create(sample_tournaments);
        res.send("Seed is done!");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const tournaments = await TournamentModel.find();
        res.send(tournaments);
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm,'i');
        const tournaments = await TournamentModel.find({NAME: {$regex:searchRegex}})
        res.send(tournaments);
    }
))

router.get("/:tournamentID", asyncHandler (
    async(req, res) => {
        const tournament = await TournamentModel.findById(req.params.tournamentID);
        res.send(tournament);
    }
))

router.post('/new', asyncHandler(
    async (req, res) => {
      const {name, type, playersCount, round, match, players, currentRound, winner, runnerUp} = req.body;
      const { playerName, tournament_win, tournament_lose, match_win, match_lose} = req.body;
      const {TOURNAMENT_ID, ROUND, FIRST_TO, DOUBLE_OUT, HOME_ID, HOME_NAME, HOME_SCORE, AWAY_ID, AWAY_NAME, AWAY_SCORE, LEG, WINNER} = req.body;
      const { COUNT, SERVICE_PLAYER, LEG_WINNER, SCORE_HISTORY } = req.body;
      const {PLAYER,TURN,SCORE,VALUE} = req.body;
      const {SECTOR1,MULTIPLIER1,SECTOR2,MULTIPLIER2,SECTOR3,MULTIPLIER3} = req.body;
      const existingTournament = await TournamentModel.findOne({name});
      if(existingTournament){
        res.status(HTTP_BAD_REQUEST).send("Tournament with this name already exists!");
        return;
      }

      const matchSettings: MatchSettings[] = match.map((m: any) => ({
        points: m.points,
        legs: m.legs,
        doubleOut: m.double_out
    }));
    
    const playersData: PlayersData[] = players.map((p: any) => ({
        name: p.name
    }));

    const existingPlayer = await PlayerModel.findOne({name: playersData[0].name});
    if(existingPlayer){
      res.status(HTTP_BAD_REQUEST).send("Player with this name already exists!");
      return;
    }

    const leg: LEG[] = LEG.map((l: any) => ({
        count: l.count,
        servicePlayer: l.servicePlayer,
        winner: l.winner,
        scoreHistory: scoreHistory
    }));

    const scoreHistory: SCORE_HISTORY[] = SCORE_HISTORY.map((s: any) => ({
        player: s.player,
        turn: turn,
        score: s.score,
        value: s.value
    }));

    const turn: TURN[] = TURN.map((t: any) => ({
        sector1: t.sector1,
        multiplier1: t.multiplier1,
        sector2: t.sector2,
        multiplier2: t.multiplier2,
        sector3: t.sector3,
        multiplier3: t.multiplier3
    }));

  
  
      const newTournament: Tournament = {
        id:'',
        name,
        type,
        playersCount,
        round,
        match: matchSettings,
        players: playersData,
        currentRound,
        winner,
        runnerUp,
      }

      const newPlayer: Player[] = Player.map((p: any) => ({
        id:'',
        name: playersData[0].name,
        tournament_win,
        tournament_lose,
        match_win,
        match_lose
      }));

      const newMatch: Match = {
        ID:'',
        TOURNAMENT_ID: newTournament.id,
        ROUND,
        FIRST_TO: matchSettings[0].legs,
        DOUBLE_OUT,
        HOME_ID,
        HOME_NAME,
        HOME_SCORE,
        AWAY_ID,
        AWAY_NAME,
        AWAY_SCORE,
        LEG: leg,
        WINNER
      }
      
      for(let i = 0 ; i < playersData.length; i++){
        const dbPlayer = await PlayerModel.create(newPlayer);
        res.send(generateTokenReponseForPlayer(dbPlayer));
      }

      for(let i = 0 ; i < playersCount/2; i++){
        newMatch[i].HOME_ID = newPlayer[i].id;
      }
      const dbTournament = await TournamentModel.create(newTournament);
      res.send(generateTokenReponse(dbTournament));
    }
  ))
  
    const generateTokenReponse = (tournament : Tournament) => {
      const token = jwt.sign({
        name:tournament.name
      },process.env.JWT_SECRET!,{
        expiresIn:"30d"
      });
  
      return {
        id: tournament.id,
        name: tournament.name,
        type: tournament.type,
        playersCount: tournament.playersCount,
        round: tournament.round,
        match: tournament.match,
        players: tournament.players,
        currentRound: tournament.currentRound,
        winner: tournament.winner,
        runnerUp: tournament.runnerUp,
        token: token
      };
    }

    const generateTokenReponseForPlayer = ( players : Player) => {
      const token = jwt.sign({
        name:players.name
      },process.env.JWT_SECRET!,{
        expiresIn:"30d"
      });
      return {
        id: players.id,
        name: players.name,
        tournament_win: players.tournament_win,
        tournament_lose: players.tournament_lose,
        match_win: players.match_win,
        match_lose: players.match_lose,
        token: token
      };
    }

export default router;