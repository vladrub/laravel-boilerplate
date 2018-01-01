import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ApiService } from '../../../../shared/services/api.service';
import { Config } from '../../../../shared/config';

@Component({
    selector: 'ff-image-upload',
    styleUrls: ['./ff-image-upload.scss'],
    template: `
        <div [formGroup]="group" class="ff-image row form-group" [ngClass]="{'has-error': (!group.controls[settings.name].valid), 'has-success': (group.controls[settings.name].valid)}">
            <label class="col-sm-3 form-control-label" [for]="settings.name">{{ settings.label }}</label>
            <div class="col-sm-9">
                <div class="ff-image-upload-container">
                    <div class="top">
                        <button class="btn btn-danger btn-icon" type="button" (click)="removeImage();"><i class="ion-close-round"></i></button>
                    </div>
                    
                    <div class="image" [style.background-image]="data && data.filename ? 'url(' + this.config.IMAGES_FOLDER + data.filename + ')' : ''" (click)="file.click()"></div>
                    
                    <div class="bottom" (click)="file.click()">Выбрать изображение</div>
                </div>
            
                <input [formControlName]="controlName" type="hidden">
                <input #fileUploadInput [id]="settings.name" type="file" hidden="true" #file (change)="onChange($event)" accept="image/*">
            </div>
        </div>
    `
})

export class FFImageUploadComponent implements OnInit {
    @Input() settings: any;
    @Input() data: any;
    @Input('group') public group: FormGroup;
    @Input('controlName') public controlName: string;

    @ViewChild('fileUploadInput') public _fileUploadInput: ElementRef;

    @Output() dataUpdated = new EventEmitter();

    constructor(protected api: ApiService, private config: Config) {
    }

    ngOnInit() {
    }

    removeImage() {
        this.data = {};
        this.dataUpdated.emit({});
        this.group.controls[this.settings.name].setValue('');
        this._fileUploadInput.nativeElement.value = '';
    }

    public onChange(event) {
        let fileList: FileList = event.srcElement.files;

        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();

            formData.append('image', file, file.name);

            this.api
                .post('media/image', formData, false)
                .then(data => {
                    this.data = data;
                    this.group.controls[this.settings.name].setValue(data.filename);
                    this.dataUpdated.emit(data);
                });
        }
    }
}