import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import instructorRouter from '@routes/instructor.routes.js';
import timeslotRouter from '@routes/timeslot.routes.js';

const app = express();

mongoose.connect(process.env.ATLAS_URI!);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(instructorRouter);
app.use(timeslotRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log('App started on PORT', PORT);
});
