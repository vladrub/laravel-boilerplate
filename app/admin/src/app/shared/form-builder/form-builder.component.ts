import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormArray, FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'form-builder',
    templateUrl: 'form-builder.component.html',
    styleUrls: ['./form-builder.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormBuilderComponent implements OnInit {
    @Input() settings: any;
    @Input() data: any;

    @Output() formSubmit = new EventEmitter();

    public form: FormGroup;
    public submitted: boolean = false;

    constructor(public fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({});

        for (let fieldSettings of this.settings.fields) {

            if ( fieldSettings.type == 'repeater' ) {
                this.form.addControl(fieldSettings.name, this.fb.array([]));
                continue;
            }

            this.form.addControl(fieldSettings.name, this.fb.group({}));
            let controlsGroup = <FormGroup>this.form.controls[fieldSettings.name];

            if ( fieldSettings.validationRules ) {
                let validators = [];
                let value = '';

                for (let validationRule of fieldSettings.validationRules) {
                    validators.push( this.getValidator(validationRule) );
                }

                if ( fieldSettings.type == 'image' ) {
                    if ( this.getValue(fieldSettings.name) ) {
                        value = this.getValue(fieldSettings.name).filename;
                    }
                } else {
                    value = this.getValue(fieldSettings.name);
                }

                controlsGroup.addControl(fieldSettings.name, new FormControl(value, Validators.compose(validators)));
            }
        }
    }

    private getValidator(validationRule: any): any {
        switch (validationRule.type) {
            case 'required':
                return Validators.required;
            case 'minLength':
                return Validators.minLength(validationRule.value);
            default:
                return false;
        }
    }

    public onSubmit(values: Object): void {
        this.submitted = true;

        if (this.form.valid) {
            this.formSubmit.emit();
        }
    }
    
    public onDataUpdated(value, target) {
        var keys = target.split('.');

        if ( keys.length > 1 ) {
            if ( ! this.data[keys[0]] ) this.data[keys[0]] = {};
            
            this.data[keys[0]][keys[1]] = value;
        } else {
            this.data[keys[0]] = value;
        }
    }

    private getValue(target) {
        var keys = target.split('.');

        if ( keys.length > 1 ) {
            if ( ! this.data[keys[0]] ) this.data[keys[0]] = {};

            return this.data[keys[0]][keys[1]];
        } else {
            return this.data[keys[0]];
        }
    }
}