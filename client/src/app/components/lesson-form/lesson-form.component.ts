import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-lesson-form',
	templateUrl: './lesson-form.component.html',
	styleUrls: ['./lesson-form.component.scss']
})
export class LessonFormComponent {
	@Input() isFormDisabled = true;
	@Output() formSubmit = new EventEmitter();
	form: FormGroup;
	numCols = 1;
	nameEmailColspan = 1;

	constructor(private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
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
		this.form.disable();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (!changes['isFormDisabled']!.currentValue.isFormDisabled) {
			this.form.enable();
		} else {
			this.form.disable();
		}
	}

	onSubmit() {
		this.formSubmit.emit(this.form.value);
	}
}
