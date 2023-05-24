import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class InstructorService {
    private apiUrl = environment.API_URL; // Replace with your API URL

    constructor(private http: HttpClient) { }

    getInstructors() {
        return this.http.get(this.apiUrl + '/instructors');
    }
}

