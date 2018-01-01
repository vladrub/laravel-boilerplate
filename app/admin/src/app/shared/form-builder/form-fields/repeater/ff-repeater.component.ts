import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
    selector: 'ff-repeater',
    styleUrls: ['./ff-repeater.scss'],
    template: `
        <div class="ff-repeater row" [ngClass]="{'has-error': (!group.valid), 'has-success': (group.valid)}">
            <label class="col-sm-3 form-control-label" [for]="settings.name">{{ settings.label }}</label>
            <div class="col-sm-9">
                <div class="ff-repeater-inner">
                
                    <h3 *ngIf="data.length == 0" class="no-data">Записи отсутствуют</h3>
                    
                    <div class="ff-repeater-row"  *ngFor="let row of data; let i = index; trackBy: customTrackBy" [formGroup]="group.controls[i]">
                        <h3>
                            Запись №{{i+1}}
                            
                            <button type="button" class="btn btn-danger" (click)="removeRow(i);">
                                <i class="fa fa-times"></i>
                            </button>
                        </h3>
                        <div class="form-group" *ngFor="let fieldSettings of settings.fields;">
                            <ff-text 
                                [settings]="fieldSettings"
                                [group]="group.controls[i].controls[fieldSettings.name]"
                                [controlName]="fieldSettings.name"
                                (dataUpdated)="data[i][fieldSettings.name] = $event"
                                *ngIf="fieldSettings.type == 'text'"></ff-text>
                                
                            <ff-date-picker
                                [settings]="fieldSettings"
                                [group]="group.controls[i].controls[fieldSettings.name]"
                                [controlName]="fieldSettings.name"
                                [data]="data[i][fieldSettings.name]"
                                (dataUpdated)="data[i][fieldSettings.name] = $event"
                                *ngIf="fieldSettings.type == 'date'"></ff-date-picker>
                            
                            <ff-image-upload
                                [settings]="fieldSettings"
                                [group]="group.controls[i].controls[fieldSettings.name]"
                                [controlName]="fieldSettings.name"
                                [data]="data[i][fieldSettings.name]"
                                (dataUpdated)="data[i][fieldSettings.name] = $event"
                                *ngIf="fieldSettings.type == 'image'"></ff-image-upload>
                            
                            <ff-select [settings]="fieldSettings"
                                [group]="group.controls[i].controls[fieldSettings.name]"
                                [controlName]="fieldSettings.name"
                                (dataUpdated)="data[i][fieldSettings.name] = $event"
                                *ngIf="fieldSettings.type == 'select'"></ff-select>
                            
                            <ff-checkbox
                                [settings]="fieldSettings"
                                [group]="group.controls[i].controls[fieldSettings.name]"
                                [controlName]="fieldSettings.name"
                                (dataUpdated)="data[i][fieldSettings.name] = $event"
                                *ngIf="fieldSettings.type == 'checkbox'"></ff-checkbox>
                                
                            <ff-video-select [settings]="fieldSettings"
                                [group]="group.controls[i].controls[fieldSettings.name]"
                                [controlName]="fieldSettings.name"
                                (dataUpdated)="data[i][fieldSettings.name] = $event"
                                *ngIf="fieldSettings.type == 'video-select'"></ff-video-select>
                        </div>
                    </div>
                
                    <div class="controls">
                        <button type="button" class="btn btn-info" (click)="addRow();">
                            <i class="fa fa-plus"></i> Добавить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class FFRepeaterComponent implements OnInit, AfterViewInit {
    @Input() settings: any;
    @Input() data: any[];
    @Input('group') public group: FormArray;
    @Input('controlName') public controlName: string;

    @Output() dataUpdated = new EventEmitter();

    constructor(public fb: FormBuilder) {
    }

    ngOnInit() {
        //http://plnkr.co/edit/I8EVLLWVkpSyv1igDxtJ?p=preview
        if ( ! this.data ) this.data = [];

        let defaults = {
            name: '',
            type: '',
            label: '',
            placeholder: ''
        };

        this.settings = Object.assign(defaults, this.settings);

        for (let i in this.data) {
            var formGroup = this.initControls( this.data[i] );
            this.addControls(formGroup);
        }
    }

    ngAfterViewInit() {
    }

    private initControls(data) {
        let rowGroup = this.fb.group({});

        for (let fieldSettings of this.settings.fields) {

            if ( fieldSettings.type == 'repeater' ) {
                rowGroup.addControl(fieldSettings.name, this.fb.array([]));
                continue;
            }

            rowGroup.addControl(fieldSettings.name, this.fb.group({}));
            let controlsGroup = <FormGroup>rowGroup.controls[fieldSettings.name];

            if ( fieldSettings.validationRules ) {
                let validators = [];
                let value = '';

                for (let validationRule of fieldSettings.validationRules) {
                    validators.push( this.getValidator(validationRule) );
                }

                if ( fieldSettings.type == 'image' ) {
                    if ( data[fieldSettings.name] ) {
                        value = data[fieldSettings.name].filename;
                    }
                } else {
                    value = data[fieldSettings.name];
                }

                if ( fieldSettings.defaultValue ) {
                    value = fieldSettings.defaultValue;
                }

                controlsGroup.addControl(fieldSettings.name, new FormControl(value, Validators.compose(validators)));
            }
        }

        return rowGroup;
    }

    private addControls(formGroup) {
        this.group.push(formGroup);
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

    customTrackBy(index: number, obj: any): any {
        return  index;
    }

    addRow() {
        var row = {};

        for (let fieldSettings of this.settings.fields) {
            row[fieldSettings.name] = '';
        }

        this.data.push(row);

        var formGroup = this.initControls( row );
        this.addControls(formGroup);

        this.dataUpdated.emit(this.data);
    }

    removeRow(i) {
        this.data.splice(i, 1);
        this.group.removeAt(i);
    }
}