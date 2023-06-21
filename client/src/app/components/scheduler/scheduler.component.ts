import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import Instructor from '@interfaces/Instructor';
import { DateService } from '@services/date.service';
import { InstructorService } from '@services/instructor.service';
import { TimeslotService } from '@services/timeslot.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import Timeslot from '@interfaces/Timeslot';

const today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);

const breakpoints = [
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
];

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
    timeslots: Timeslot[] = [];
    isFormDisabled = true;
    numCols = 1;
    ceil = Math.ceil;

    constructor(
        private instructorService: InstructorService,
        private timeslotService: TimeslotService,
        private dateService: DateService,
        private breakpointObserver: BreakpointObserver
    ) {
        // create the controls for instructor and date inputs
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
        /* breakpoint observer changes the number of columns
        in the grid depending on screen size */
        this.breakpointObserver.observe(breakpoints)
            .subscribe(result => {
                if (
                    result.breakpoints[breakpoints[0]] ||
                    result.breakpoints[breakpoints[1]] ||
                    result.breakpoints[breakpoints[2]]
                ) {
                    this.numCols = 2;
                } else {
                    this.numCols = 1;
                }
            });
        // populates list of instructors for dropdown
        this.instructorService.getInstructors()
            .subscribe((dataArray: Instructor[]) => {
                this.instructors = dataArray;
            });
    }

    // validates that the date selected is today or in the future
    minDateValidator() {
        return (control: AbstractControl) => {
            const selectedDate = new Date(control.value);
            const currentDate = new Date();
            return selectedDate >= currentDate ? null : { minDate: true };
        };
    }

    // enables datepicker and fetches timeslots
    handleInstructorChange(change: MatSelectChange) {
        console.log('Instructor:', change);
        this.dateControl.enable();
        this.getTimeslots((change as unknown as string), this.dateControl.value);
    }

    // fetches timeslots when the date input changes
    handleDateChange(event: MatDatepickerInputEvent<any, any>) {
        console.log('Date:', event.target.value);
        this.isFormDisabled = true;
        this.getTimeslots(this.instructorControl.value, event.target.value);
    }

    // fetches timeslots based on instructor and date
    getTimeslots(instructorId: string, date: Date) {
        this.timeslots = [];
        this.timeslotService.getTimeslots(instructorId, date)
            .subscribe((dataArray: Timeslot[]) => {
                dataArray.forEach(timeslot => {
                    if (timeslot.time < new Date().getTime()) {
                        timeslot.open = false;
                    }
                    this.timeslots.push(timeslot);
                });
            });
    }

    // sets timeslotId to the currently selected timeslot
    onTimeslotClick(event: MatButtonToggleChange) {
        console.log('Timeslot:', event.value);
        this.isFormDisabled = false;
        this.timeslotId = event.value;
    }

    /* When the user submits the form, the studentName, studentEmail, and
    studentNotes fields on the timeslot are updated in the db. A
    confirmation email is sent to studentEmail. */
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

    getTimeslotById(id: string) {
        return this.timeslots.filter(timeslot => {
            return timeslot._id === id;
        })[0];
    }

    // formats date to MM/DD/YYYY
    getDisplayDate(date: Date) {
        return this.dateService.getDisplayDate(date);
    }
}
