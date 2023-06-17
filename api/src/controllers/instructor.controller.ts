import { NextFunction } from "express";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { BSONError } from "bson";
import Instructor from "@models/instructor.model.js";
dotenv.config();

// CREATE

export const instructorCreate = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let instructor = req.body;
            await Instructor.validate(instructor);
            let result = await Instructor.create(instructor);
            let id = result._id._id;
            console.log('Created instructor:', id);
            res.status(201).send(id);
        } catch (err) {
            console.log(err);
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).send("Invalid request body");
            } else {
                res.status(500).send("Internal server error");
            }
        }
    }
);

// READ

export const instructorDetail = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = req.params.id;
            let result = await Instructor.findById(id);
            if (!result) {
                console.log('Could not find isntructor:', id);
                res.status(404).send("Resource not found");
            }
            else {
                console.log('Retrieved instructor:', id);
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

export const instructorList = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let results = await Instructor.find(req.query);
        console.log('Retrieved all instructors');
        res.status(200).send(results);
    }
);

// UPDATE

export const instructorReplace = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let instructor = req.body;
            await Instructor.validate(instructor);
            let id = req.params.id;
            let filter = { _id: new ObjectId(id) };
            let result = await Instructor.findOneAndReplace(filter, instructor);
            if (!result) {
                console.log('Could not find instructor:', id);
                res.status(404).send("Resource not found");
            }
            else {
                console.log('Replaced instructor:', id);
                res.status(200).send(result);
            }
        } catch (err) {
            console.log(err);
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(400).send("Invalid request body");
            } else if (err instanceof BSONError) {
                res.status(400).send("Invalid resource id");
            } else {
                res.status(500).send("Internal server error");
            }
        }
    }
);

export const instructorModify = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = req.params.id;
            let mods = req.body;
            let result = await Instructor.findByIdAndUpdate(id, mods);
            if (!result) {
                console.log('Could not find instructor:', id);
                res.status(404).send("Resource not found");
            }
            else {
                console.log('Modified instructor:', id);
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

export const instructorsModify = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { mods, filter } = req.body;
            let result = await Instructor.updateMany(filter, mods);
            console.log('Modified instructor(s)');
            res.status(200).send(result);
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

// DELETE

export const instructorDelete = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let id = req.params.id;
            let result = await Instructor.findByIdAndDelete(id);
            if (!result) {
                console.log('Could not find instructor:', id);
                res.status(404).send("Resource not found");
            }
            else {
                console.log('Deleted instructor:', id);
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

export const instructorsDelete = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            let filter = req.body;
            let result = await Instructor.deleteMany(filter);
            console.log('Deleted instructors');
            res.status(200).send(result);
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
