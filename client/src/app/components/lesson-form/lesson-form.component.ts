import {
	Component,
	Input,
	Output,
	OnInit,
	OnChanges,
	SimpleChanges,
	EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-lesson-form',
	templateUrl: './lesson-form.component.html',
	styleUrls: ['./lesson-form.component.scss']
})
export class LessonFormComponent {
	// parent component controls when form is enabled
	@Input() isFormDisabled = true;
	// event is emitted when the form is submitted
	@Output() formSubmit = new EventEmitter();
	form: FormGroup;
	numCols = 1;
	nameEmailColspan = 1;

	constructor(private formBuilder: FormBuilder) {
		// create form for student input
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

	// enable form when a timeslot is selected
	ngOnChanges(changes: SimpleChanges) {
		if (!changes['isFormDisabled']!.currentValue.isFormDisabled) {
			this.form.enable();
		} else {
			this.form.disable();
		}
	}

	// emit event when submit button is clicked
	onSubmit() {
		this.formSubmit.emit(this.form.value);
	}
}
