import express from "express";
import {
    timeslotList, timeslotModify,
} from "@controllers/timeslot.controller.js"

const router = express.Router();

router.get('/timeslots', timeslotList);

router.patch('/timeslot/:id', timeslotModify);

export default router;
