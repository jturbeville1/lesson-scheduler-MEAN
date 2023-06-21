import { 
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { DateService } from '@services/date.service';

@Component({
    selector: 'app-day-schedule',
    templateUrl: './day-schedule.component.html',
    styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent {
    // list of timeslots populates button group
    @Input() timeslots!: any;
    // event is emitted when a timeslot button is clicked
    @Output() timeslotClick = new EventEmitter();

    constructor(
        private dateService: DateService,
    ) { }

    // formats date to MM/DD/YYYY
    getDisplayTime(time: number) {
        return this.dateService.getDisplayTime(time);
    }

    // emit event when timeslot button is clicked
    handleButtonClick(event: MatButtonToggleChange) {
        this.timeslotClick.emit(event);
    }
}
