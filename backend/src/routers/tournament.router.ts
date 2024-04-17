import { Router } from "express";
import { sample_tournaments } from "../data";
import asyncHandler from 'express-async-handler';
import { Tournament, TournamentModel } from "../models/tournament.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import jwt from 'jsonwebtoken';

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

router.post('/newTournament', asyncHandler(
    async (req, res) => {
      const {name, type, playersCount, round, match, players, currentRound, winner, runnerUp} = req.body;
      const existingTournament = await TournamentModel.findOne({name});
      if(existingTournament){
        res.status(HTTP_BAD_REQUEST).send("Tournament with this name already exists!");
        return;
      }
  
  
      const newTournament: Tournament = {
        id:'',
        name,
        type,
        playersCount,
        round,
        match,
        players,
        currentRound,
        winner,
        runnerUp,
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

export default router;