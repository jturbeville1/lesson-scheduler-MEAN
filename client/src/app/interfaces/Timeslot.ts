export default interface Timeslot {
    _id: string;
    instructorId: string;
    time: number;
    open: boolean;
    studentName?: string;
    studentEmail?: string;
    studentNotes?: string;
}