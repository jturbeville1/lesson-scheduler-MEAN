import { Injectable } from '@angular/core';

/* This service performs operations on dates 
(conversions, formatting, etc.). Several different
components require date manipulation, */

@Injectable({
    providedIn: 'root'
})
export class DateService {
    // formats date to MM/DD/YYYY
    getDisplayDate(date: Date) {
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    }

    // formats times to AM-PM standard
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
