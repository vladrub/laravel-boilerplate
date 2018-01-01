import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'ff-video-select',
    template: `
        <div [formGroup]="group" class="row" [ngClass]="{'has-error': (!group.controls[settings.name].valid), 'has-success': (group.controls[settings.name].valid)}" *ngIf="vimeoVideos">
            <label class="col-sm-3 form-control-label" [for]="settings.name">{{ settings.label }}</label>
            <div class="col-sm-9">
                <select class="form-control" (change)="onTagChange($event)">
                    <option value="" selected="selected">Выберите тег...</option>
                    <option *ngFor="let tag of vimeoVideosKeys;" [selected]="currentTag == tag">{{ tag }}</option>
                </select>
                
                <br>
                
                <div *ngFor="let tag of vimeoVideosKeys; let i = index;">
                    <select class="form-control" [id]="settings.name" [formControlName]="controlName" (change)="onChange($event)" *ngIf="currentTag == tag">
                        <option value="" selected="selected">Выберите видео...</option>
                        <option *ngFor="let video of vimeoVideos[tag]; let i = index;" [value]="video.link">
                            {{ video.name }}
                        </option>
                    </select>
                </div>
                
                <br>
                <a [href]="group.controls[settings.name].value + '/settings'" target="_blank" style="float: right;">Редактировать видео в Vimeo</a>
            </div>
        </div>
    `
})

export class FFVideoSelectComponent implements OnInit {
    @Input() settings: any;
    @Input('group') public group: FormGroup;
    @Input('controlName') public controlName: string;

    @Output() dataUpdated = new EventEmitter();

    currentTag: any = '';
    vimeoVideos: any = false;
    vimeoVideosKeys: any = false;

    constructor(protected api: ApiService) {
    }

    ngOnInit() {
        this.api
            .get('vimeo')
            .then(data => {
                this.vimeoVideos = data;
                this.vimeoVideosKeys = Object.keys(this.vimeoVideos);

                for (let key of this.vimeoVideosKeys) {
                    for (let video of this.vimeoVideos[key]) {
                        if ( video['link'] == this.group.controls[this.settings.name].value ) {
                            this.currentTag = key;
                        }
                    }
                }
            });

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

    onTagChange($event) {
        this.currentTag = $event.target.value;
    }
}