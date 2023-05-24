import { DaySchedule } from "@interfaces/DaySchedule";

const daySchedule: DaySchedule = {
    date: new Date("2023-05-20"),
    timeslots: [
        {
            time: '8:00',
            open: true,
        },
        {
            time: '9:00',
            open: true,
        },
        {
            time: '10:00',
            open: false,
        },
        {
            time: '11:00',
            open: true,
        },
        {
            time: '12:00',
            open: false,
        },
        {
            time: '1:00',
            open: true,
        },
        {
            time: '2:00',
            open: true,
        },
    ],
};

export const getDaySchedule = (date: Date) => {
    return daySchedule;
}

export const schedule = {
    1: [
        {
            date: '4/30',
            times: [
                '8:00',
                '9:00',
                '10:00',
                '11:00',
                '12:00',
                '1:00',
                '2:00',
            ],
        },
        {
            date: '5/1',
            times: [
                '8:00',
                '9:00',
                '10:00',
                '11:00',
                '12:00',
                '1:00',
                '2:00',
            ],
        },
        {
            date: '5/2',
            times: [
                '8:00',
                '9:00',
                '10:00',
                '11:00',
                '12:00',
                '1:00',
                '2:00',
            ],
        },
        {
            date: '5/3',
            times: [
                '8:00',
                '9:00',
                '10:00',
                '11:00',
                '12:00',
                '1:00',
                '2:00',
            ],
        },
        {
            date: '5/4',
            times: [
                '8:00',
                '9:00',
                '10:00',
                '11:00',
                '12:00',
                '1:00',
                '2:00',
            ],
        },
        {
            date: '5/5',
            times: [
                '8:00',
                '9:00',
                '10:00',
                '11:00',
                '12:00',
                '1:00',
                '2:00',
            ],
        },
        {
            date: '5/6',
            times: [
                '8:00',
                '9:00',
                '10:00',
                '11:00',
                '12:00',
                '1:00',
                '2:00',
            ],
        },
    ]
};