import { Router } from "express";
import { sample_tournaments } from "../data";
import asyncHandler from 'express-async-handler';
import { Tournament, TournamentModel, MatchSettings, PlayersData } from "../models/tournament.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import jwt from 'jsonwebtoken';
import { Player, PlayerModel } from "../models/player.model";
import { Match,LEG, SCORE_HISTORY, TURN, MatchModel } from "../models/match.model";

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
      const {name, type, playersCount, match, players} = req.body;
      // const { playerName, tournament_win, tournament_lose, match_win, match_lose} = req.body;
      // const {TOURNAMENT_ID, ROUND, FIRST_TO, DOUBLE_OUT, HOME_ID, HOME_NAME, HOME_SCORE, AWAY_ID, AWAY_NAME, AWAY_SCORE, LEG, WINNER} = req.body;
      // const { COUNT, SERVICE_PLAYER, LEG_WINNER, SCORE_HISTORY } = req.body;
      // const {PLAYER,TURN,SCORE,VALUE} = req.body;
      // const {SECTOR1,MULTIPLIER1,SECTOR2,MULTIPLIER2,SECTOR3,MULTIPLIER3} = req.body;
      const existingTournament = await TournamentModel.findOne({name});
      if(existingTournament){
        res.status(HTTP_BAD_REQUEST).send("Tournament with this name already exists!");
        return;
      }

    //   const matchSettings: MatchSettings[] = match.map((m: any) => ({
    //     points: m.points,
    //     legs: m.legs,
    //     doubleOut: m.double_out
    // }));
    
    // const playersData: PlayersData[] = players.map((p: any) => ({
    //     name: p.name
    // }));

    const existingPlayer = await PlayerModel.findOne({name});
    if(existingPlayer){
      res.status(HTTP_BAD_REQUEST).send("Player with this name already exists!");
      return;
    }

    // const leg: LEG[] = LEG.map((l: any) => ({
    //     count: l.count,
    //     servicePlayer: l.servicePlayer,
    //     winner: l.winner,
    //     scoreHistory: scoreHistory
    // }));

    // const scoreHistory: SCORE_HISTORY[] = SCORE_HISTORY.map((s: any) => ({
    //     player: s.player,
    //     turn: turn,
    //     score: s.score,
    //     value: s.value
    // }));

    // const turn: TURN[] = TURN.map((t: any) => ({
    //     sector1: t.sector1,
    //     multiplier1: t.multiplier1,
    //     sector2: t.sector2,
    //     multiplier2: t.multiplier2,
    //     sector3: t.sector3,
    //     multiplier3: t.multiplier3
    // }));

  
  
      const newTournament: Tournament = {
        id:'',
        name: req.body.name,
        type: req.body.type,
        playersCount: req.body.playersCount,
        match: [req.body.match],
        players: req.body.players,
        currentRound: "Round 1",
        winner: '',
        runnerUp:'',
      }


      console.log('Parsed Tournament Request:', newTournament);
      const dbTournament = await TournamentModel.create(newTournament);
      res.send(dbTournament);

      for (let i = 0; i < newTournament.players.length; i++) {
        const newPlayer: Player = {
          id:'',
          name: newTournament.players[i].name,
          tournament_win:0,
          tournament_lose:0,
          match_win:0,
          match_lose:0
        }

        const dbPlayer =await PlayerModel.create(newPlayer);
        res.send(dbPlayer);
        console.log('Parsed Player Request:', newPlayer);
      }

      const newMatch: Match = {
        ID:'',
        TOURNAMENT_ID: newTournament.id,
        ROUND: '',
        FIRST_TO: req.body.match.legs,
        DOUBLE_OUT: req.body.match.double_out,
        HOME_ID: '',
        HOME_NAME: '',
        HOME_SCORE: 0,
        AWAY_ID: '',
        AWAY_NAME: '',
        AWAY_SCORE: 0,
        LEG: [],
        WINNER: ''
      }
      

      // const newPlayer: Player[] = Player.map((p: any) => ({
      //   id:'',
      //   name: playersData[0].name,
      //   tournament_win,
      //   tournament_lose,
      //   match_win,
      //   match_lose
      // }));

      // const newMatch: Match = {
      //   ID:'',
      //   TOURNAMENT_ID: newTournament.id,
      //   ROUND,
      //   FIRST_TO: matchSettings[0].legs,
      //   DOUBLE_OUT,
      //   HOME_ID,
      //   HOME_NAME,
      //   HOME_SCORE,
      //   AWAY_ID,
      //   AWAY_NAME,
      //   AWAY_SCORE,
      //   LEG: leg,
      //   WINNER
      // }
      
      // for(let i = 0 ; i < playersData.length; i++){
      //   const dbPlayer = await PlayerModel.create(newPlayer);
      //   res.send(generateTokenReponseForPlayer(dbPlayer));
      // }

      // for(let i = 0 ; i < playersCount/2; i++){
      //   newMatch[i].HOME_ID = newPlayer[i].id;
      // }
      console.log('Parsed Tournament Request:', newTournament);
      console.log('Parsed Match Request:', newMatch);


      const dbMatch = await MatchModel.create(newMatch);
      res.send(dbMatch);
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