import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Config } from '../../shared/config';

import { NotificationsService } from "angular2-notifications";

@Component({
    selector: 'schedule',
    templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnInit {

    @ViewChild('dataTable') _dataTable;

    dataTableSettings = {
        url: this.config.API_URL + 'schedule',
        title: 'Текущая телепрограмма',
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: [
            {
                name: '_id',
                label: 'ID #'
            },
            {
                name: 'beginDate',
                label: 'Дата начала',
                filter: {
                    type: 'date'
                }
            },
            {
                name: 'name',
                label: 'Название'
            }
        ]
    };

    constructor(protected api: ApiService, protected config: Config, private _notificationsService: NotificationsService) {
    }

    onSubmit(event, form): void {
        event.preventDefault();

        let input: any = $('input#file', event.target)[0];

        let fileList: FileList = input.files;

        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();

            formData.append('file', file, file.name);

            this.api
                .post('schedule', formData, false)
                .then(data => {
                    this._notificationsService.success(
                        'Успех!',
                        'Таблица обновлена'
                    );
                    this.loadSchedule();
                })
                .catch(data => {
                    this._notificationsService.error(
                        'Ошибка!',
                        'Проверьте csv документ на наличие ошибок'
                    );
                });
        } else {
            this._notificationsService.error(
                'Ошибка!',
                'Вы не выбрали файл!'
            );
        }
    }

    ngOnInit() {
    }

    loadSchedule() {
        this._dataTable.reload();
    }
}