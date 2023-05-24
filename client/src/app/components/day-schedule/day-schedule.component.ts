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
    @Input() timeslots!: any;
    @Output() timeslotClick = new EventEmitter();

    constructor(
        private dateService: DateService,
    ) { }

    getDisplayTime(time: number) {
        return this.dateService.getDisplayTime(time);
    }

    handleButtonClick(event: MatButtonToggleChange) {
        this.timeslotClick.emit(event);
    }
}
