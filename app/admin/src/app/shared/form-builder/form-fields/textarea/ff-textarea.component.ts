import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'ff-textarea',
    template: `
        <div [formGroup]="group" class="row" [ngClass]="{'has-error': (!group.controls[settings.name].valid), 'has-success': (group.controls[settings.name].valid)}">
            <label class="col-sm-3 form-control-label" [for]="settings.name">{{ settings.label }}</label>
            <div class="col-sm-9">
                <textarea class="form-control" [id]="settings.name" [placeholder]="settings.placeholder" [formControlName]="controlName" (keyup)="onChange($event)" type="text"></textarea>
            </div>
        </div>
    `
})

export class FFTextareaComponent implements OnInit {
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