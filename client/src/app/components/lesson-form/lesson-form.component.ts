import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-lesson-form',
	templateUrl: './lesson-form.component.html',
	styleUrls: ['./lesson-form.component.scss']
})
export class LessonFormComponent {
	@Input() timeslotDetails: any;
	@Output() formSubmit = new EventEmitter();
	formGroup: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.formGroup = this.formBuilder.group({
			date: [''],
			time: [''],
			studentName: ['', [
				Validators.required,
				Validators.minLength(3),
			]],
			studentEmail: ['', [
				Validators.required,
				Validators.email,
			]],
			studentNotes: [''],
		});
	}

	ngOnInit() {
		this.formGroup.patchValue({
			date: this.timeslotDetails.displayDate,
			time: this.timeslotDetails.displayTime,
		});
	}

	onSubmit() {
		this.formSubmit.emit(this.formGroup.value);
	}
}
