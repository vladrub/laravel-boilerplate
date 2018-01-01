import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'ff-select',
    template: `
        <div [formGroup]="group" class="row" [ngClass]="{'has-error': (!group.controls[settings.name].valid), 'has-success': (group.controls[settings.name].valid)}">
            <label class="col-sm-3 form-control-label" [for]="settings.name">{{ settings.label }}</label>
            <div class="col-sm-9">
                <select class="form-control" [id]="settings.name" [formControlName]="controlName" (change)="onChange($event)">
                    <option value="" selected="selected">Выберите значение...</option>
                    <option *ngFor="let option of settings.options; let i = index;" [value]="option.value">
                        {{ option.title }}
                    </option>
                </select>
            </div>
        </div>
    `
})

export class FFSelectComponent implements OnInit {
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
            placeholder: '',
            validationRules: []
        };

        this.settings = Object.assign(defaults, this.settings);
    }

    onChange($event) {
        this.dataUpdated.emit($event.target.value);
    }
}