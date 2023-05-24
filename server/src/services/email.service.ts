import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import Instructor from "@models/instructor.model.js";
import { getDisplayDate, getDisplayTime } from "@services/date.service.js";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendConfirmationEmail = async (email: string, timeslot: any): Promise<void> => {
    let date = new Date(timeslot.time);
    let instructor = await Instructor.findById(timeslot.instructorId);
    let emailText = 'Your have a lesson with ' + instructor?.name +
        ' at ' + getDisplayTime(date.getTime()) + ' on ' + getDisplayDate(date) + '.';
    
    let mailOptions = {
        from: `Lesson Scheduler <${process.env.EMAIL_ADDRESS}>`,
        to: email,
        subject: 'Lesson Confirmation',
        text: emailText,
    };
    transporter.sendMail(mailOptions).then(info => {
        console.log(info.messageId);
    }).catch(err => {
        console.log(err);
    })
}
