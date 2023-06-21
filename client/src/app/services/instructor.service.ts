import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Instructor from '@interfaces/Instructor';

/* This service interacts with REST API backend to
perform CRUD operations on instructor documents. */

@Injectable({
    providedIn: 'root'
})

export class InstructorService {
    private apiUrl = environment.API_URL; // Replace with your API URL

    constructor(private http: HttpClient) { }

    // fetch list of instructors
    getInstructors() {
        return this.http.get<Instructor[]>(this.apiUrl + '/instructors');
    }
}
