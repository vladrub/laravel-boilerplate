import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FFDatePickerSettings } from './ff-date-picker-settings.interface';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'ff-date-picker',
    template: `
        <div [formGroup]="group" class="row" [ngClass]="{'has-error': (!group.controls[settings.name].valid), 'has-success': (group.controls[settings.name].valid)}">
            <label class="col-sm-3 form-control-label" [for]="settings.name">{{ settings.label }}</label>
            <div class="col-sm-9">
                <input class="form-control" [id]="settings.name" [placeholder]="settings.placeholder" [formControlName]="controlName" (keyup)="onChange($event)" type="text" #flatpickr>
            </div>
        </div>
    `,
    styles: ['']
})

export class FFDatePickerComponent implements AfterViewInit {
    @Input() settings: any;
    @Input('group') public group: FormGroup;
    @Input('controlName') public controlName: string;

    @Output() dataUpdated = new EventEmitter();
    @Input() data: string | Date;

    private flatpickr: any;
    @ViewChild('flatpickr') _flatpickrElement: any;

    constructor() {
    }

    ngOnInit() {
        let defaults = {
            name: '',
            type: '',
            label: '',
            placeholder: '',
            validationRules: []
        };

        this.settings = Object.assign(defaults, this.settings);
    }

    ngAfterViewInit() {
        if ( ! this.data ) this.data = '';

        this.flatpickr = this._flatpickrElement.nativeElement.flatpickr({
            // wrap: true,
            clickOpens: true,
            time_24hr: true,
            onChange: ( selectedDates: any ) => { this.onChange() }
        });
    }

    onChange() {
        this.dataUpdated.emit(this._flatpickrElement.nativeElement.value);
    }
}