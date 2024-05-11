import { Router } from "express";
import { sample_test } from "../data";
import asyncHandler from 'express-async-handler';
import { Test, TestModel } from "../models/test.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const testCount = await TestModel.countDocuments();
        if(testCount>0){
            res.send("Seed is already done!");
            return;
        }

        await TestModel.create(sample_test);
        res.send("Seed is done!");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const test = await TestModel.find();
        res.send(test);
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm,'i');
        const test = await TestModel.find({type: {$regex:searchRegex}})
        res.send(test);
    }
))

router.get("/:testID", asyncHandler (
    async(req, res) => {
        const test = await TestModel.findById(req.params.playerID);
        res.send(test);
    }
))

router.post("/new", asyncHandler(
  async (req, res) => {
    const {type,count,question,answer,bot} = req.body;

    const existingTest = await TestModel.findOne({type});
    if(existingTest){
      res.status(HTTP_BAD_REQUEST).send("Test with this type already exists!");
      return;
    }

    const newTest: Test = {
      id:'',
      type,
      count,
      question,
      answer,
      bot
    }

    console.log('Parsed data: ', newTest);
    const dbtest = await TestModel.create(newTest);
    res.send(dbtest);
  }
))

export default router;