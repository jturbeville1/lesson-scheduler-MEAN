import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavigationComponent } from '@components/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SchedulerComponent } from '@components/scheduler/scheduler.component';
import { DayScheduleComponent } from '@components/day-schedule/day-schedule.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { InstructorService } from '@services/instructor.service';
import { TimeslotService } from '@services/timeslot.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { LessonFormComponent } from '@components/lesson-form/lesson-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        SchedulerComponent,
        DayScheduleComponent,
        LessonFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        HttpClientModule,
        MatGridListModule,
        MatCardModule,
        ReactiveFormsModule,
    ],
    providers: [
        InstructorService,
        TimeslotService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
