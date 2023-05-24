import { Injectable } from '@angular/core';

const millisPerDay = 86400000;

@Injectable({
    providedIn: 'root'
})
export class DateService {
    getDisplayDate(date: Date) {
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    }

    getDisplayTime(time: number) {
        let date = new Date(time);
        let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
        let hours = date.getHours();
        let period = 'AM';
        if (hours >= 12) {
            period = 'PM';
            if (hours >= 13) {
                hours = hours - 12;
            }
        }
        
        return `${hours}:${minutes} ${period}`;
    }
}
