export default interface Timeslot {
    time: number;
    instructorId: string,
    studentId?: string,
    open: boolean;
}