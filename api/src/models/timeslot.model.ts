import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TimeslotSchema = new Schema({
    time: {
        type: Number,
        required: true,
    },
    instructorId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    studentName: {
        type: String
    },
    studentEmail: {
        type: String
    },
    studentNotes: {
        type: String
    },
    open: {
        type: Boolean,
        required: true,
    },
});

export default mongoose.model('Timeslot', TimeslotSchema);
