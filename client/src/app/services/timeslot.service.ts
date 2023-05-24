import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const millisPerDay = 86400000;

@Injectable({
    providedIn: 'root'
})
export class TimeslotService {
    constructor(
        private http: HttpClient,
    ) { }

    getTimeslots(instructorId: string, date: Date) {
        let startTime = date.getTime();
        let endTime = startTime + millisPerDay;
        let query = `?instructorId=${instructorId}&time[$gte]=${startTime}&time[$lt]=${endTime}&sort=time`;
        return this.http.get(environment.API_URL + '/timeslots' + query);
    }

    updateTimeslot(timeslotId: string, data: any) {
        return this.http.patch(
            environment.API_URL + '/timeslot/' + timeslotId,
            data,
        );
    }
}
