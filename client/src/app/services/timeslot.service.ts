import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Timeslot from '@interfaces/Timeslot';

/* This service interacts with REST API backend to
perform CRUD operations on timeslot documents. */

const millisPerDay = 86400000;

@Injectable({
    providedIn: 'root'
})
export class TimeslotService {
    constructor(
        private http: HttpClient,
    ) { }

    // fetches sorted list of timeslots by instructor and date
    getTimeslots(instructorId: string, date: Date) {
        let startTime = date.getTime();
        let endTime = startTime + millisPerDay;
        let query = `?instructorId=${instructorId}&time[$gte]=${startTime}&time[$lt]=${endTime}&sort=time`;
        return this.http.get<Timeslot[]>(environment.API_URL + '/timeslots' + query);
    }

    // updates a timeslot
    updateTimeslot(timeslotId: string, data: Partial<Timeslot>) {
        return this.http.patch(
            environment.API_URL + '/timeslot/' + timeslotId,
            data,
        );
    }
}
