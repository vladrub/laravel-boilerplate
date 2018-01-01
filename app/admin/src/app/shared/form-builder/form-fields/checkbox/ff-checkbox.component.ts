import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'ff-checkbox',
    template: `
        <div [formGroup]="group" class="row" [ngClass]="{'has-error': (!group.controls[settings.name].valid), 'has-success': (group.controls[settings.name].valid)}">
            <label class="col-sm-3 form-control-label" [for]="settings.name">{{ settings.label }}</label>
            <div class="col-sm-9">
                <input type="checkbox" [id]="settings.name" [formControlName]="controlName" (change)="onChange($event)">
            </div>
        </div>
    `
})

export class FFCheckboxComponent implements OnInit {
    @Input() settings: any;
    @Input('group') public group: FormGroup;
    @Input('controlName') public controlName: string;

    @Output() dataUpdated = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        let defaults = {
            name: '',
            type: '',
            label: '',
            validationRules: []
        };

        this.settings = Object.assign(defaults, this.settings);
    }

    onChange($event) {
        this.dataUpdated.emit($event.target.checked);
    }
}