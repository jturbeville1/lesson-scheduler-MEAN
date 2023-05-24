import { NextFunction } from "express";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Timeslot from "@models/timeslot.model.js";
import dotenv from 'dotenv';
import { BSONError } from "bson";
import {
    createFieldSelectionObj,
    createMongooseQuery,
    createSortObj
} from "@services/request.service.js";
import { sendConfirmationEmail } from "@services/email.service.js";
dotenv.config();

// READ

export const timeslotList = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let queryObj = createMongooseQuery(req.query);
        let query = Timeslot.find(queryObj);
        
        if (req.query.sort) {
            let sortObj = createSortObj(req.query.sort as string);
            query.sort(sortObj);
        }

        if (req.query.fields) {
            let fieldSelectionObj = createFieldSelectionObj(req.query.fields as string);
            query.select(fieldSelectionObj);
        }
        let results = await query;
        console.log('Retrieved timeslots');
        
        res.status(200).send(results);
    }
);

// UPDATE

export const timeslotModify = expressAsyncHandler(
    async (req, res, next) => {
        try {
            let id = req.params.id;
            let mods = req.body;
            let result = await Timeslot.findByIdAndUpdate(id, mods);
            if (!result) {
                console.log('Could not find timeslot:', id);
                res.status(404).send("Resource not found");
            }
            else {
                console.log('Modified timeslot:', id);
                if (Object.hasOwn(mods, 'studentEmail')) {
                    sendConfirmationEmail(mods.studentEmail, result);
                }
                res.status(200).send(result);
            }
        } catch (err) {
            console.log(err);
            if (err instanceof BSONError) {
                res.status(400).send("Invalid resource id");
            } else {
                res.status(500).send("Internal server error");
            }
        }
    }
);
