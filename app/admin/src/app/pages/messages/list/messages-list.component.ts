import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Config } from '../../../shared/config';
import { Router } from "@angular/router";

@Component({
    selector: 'messages',
    templateUrl: 'messages-list.component.html'
})
export class MessagesListComponent {
    @ViewChild('dataTable') _dataTable;

    dataTableSettings = {
        url: this.config.API_URL + 'messages',
        title: 'Список сообщений',
        actions: {
            edit: true,
            delete: true,
        },
        columns: [
            {
                name: 'from',
                label: 'От'
            },
            {
                name: 'email',
                label: 'Email'
            },
            {
                name: 'created_at',
                label: 'Дата создания',
                order: "asc",
                filter: {
                    type: 'date'
                }
            },
            {
                name: 'incognito',
                label: 'Инкогнито',
                data: (row) => {
                    if ( row.incognito == true ) return 'Да';
                    if ( row.incognito == false ) return 'Нет';
                }
            },
            {
                name: 'status',
                label: 'Статус',
                data: (row) => {
                    if ( row.status == 0 ) return 'Создан';
                    if ( row.status == 1 ) return 'Не отвечен';
                    if ( row.status == 2 ) return 'Отвечен';
                }
            },
        ]
    };

    constructor(protected api: ApiService, private config: Config, private router: Router) {  }

    onEdit(row) {
        // window.open(this.config.BASE_URL + 'admin/pages/messages/edit/' + row.data()._id);
        this.router.navigate(['pages/messages/edit', row.data()._id]);
    }

    onDelete(row) {
        this.api
            .delete('message/' + row.data()._id)
            .then(data => {
                row.draw();
            });
    }

    loadHeroes() {
        this._dataTable.reload();
    }
}