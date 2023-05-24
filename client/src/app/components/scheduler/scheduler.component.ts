import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import Instructor from '@interfaces/Instructor';
import { DateService } from '@services/date.service';
import { InstructorService } from '@services/instructor.service';
import { TimeslotService } from '@services/timeslot.service';
import { toArray } from 'rxjs';

const today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
    instructorControl: FormControl;
    dateControl: FormControl;
    minDate = new Date();
    instructors: Instructor[] = [];
    timeslotId = '';
    timeslotDetails: any;
    timeslots: any[] = [];

    constructor(
        private instructorService: InstructorService,
        private timeslotService: TimeslotService,
        private dateService: DateService,
    ) {
        this.instructorControl = new FormControl('', [Validators.required]);
        this.dateControl = new FormControl({ 
            value: today,
            disabled: true
        }, [
            Validators.required,
            this.minDateValidator(),
        ]);
    }

    ngOnInit() {
        this.instructorService.getInstructors()
            .pipe(toArray())
            .subscribe((dataArray: any[]) => {
                this.instructors = dataArray[0];
            });
    }

    minDateValidator() {
        return (control: AbstractControl) => {
            const selectedDate = new Date(control.value);
            const currentDate = new Date();
            return selectedDate >= currentDate ? null : { minDate: true };
        };
    }

    handleInstructorChange(event: MatSelectChange) {
        console.log('Instructor:', event);
        this.dateControl.enable();
        console.log(this.dateControl.value);
        
        this.getTimeslots((event as unknown as string), this.dateControl.value);
    }

    handleDateChange(event: MatDatepickerInputEvent<any, any>) {
        console.log('Date:', event.target.value);
        this.getTimeslots(this.instructorControl.value, event.target.value);
    }

    getTimeslots(instructorId: string, date: Date) {
        this.timeslots = [];
        this.timeslotService.getTimeslots(instructorId, date)
            .pipe(toArray())
            .subscribe((dataArray: any[]) => {
                dataArray[0].forEach((timeslot: any) => {
                    if (timeslot.time < new Date().getTime()) {
                        timeslot.open = false;
                    }
                    this.timeslots.push(timeslot);
                });
            });
    }

    onTimeslotClick(event: MatButtonToggleChange) {
        console.log('Timeslot:', event.value);
        let curTimeslot = this.getTimeslotById(event.value);
        this.timeslotDetails = {
            displayDate: this.getDisplayDate(new Date(curTimeslot.time)),
            displayTime: this.dateService.getDisplayTime(curTimeslot.time),
        };
        this.timeslotId = event.value;
    }

    onFormSubmit(event: any) {
        this.timeslotService.updateTimeslot(this.timeslotId, {
            studentName: event.studentName,
            studentEmail: event.studentEmail,
            studentNotes: event.studentNotes || '',
            open: false,
        }).subscribe(res => {    
            let alertMessage;
            if (res) {
                alertMessage = 'Your lesson was booked! Check your email for confirmation.';
            } else {
                alertMessage = 'Oops. We were unable to book your lesson. Please try again later.'
            }
            window.alert(alertMessage);
            window.location.reload();
        });
    }
    
    getInstructorById(id: string) {
        return this.instructors.filter(instructor => {
            return instructor._id === id;
        })[0];
    }

    getDisplayDate(date: Date) {
        return this.dateService.getDisplayDate(date);
    }

    getTimeslotById(id: string) {
        return this.timeslots.filter(timeslot => {
            return timeslot._id === id;
        })[0];
    }
}
