import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Config } from '../../../shared/config';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'contest-details',
    templateUrl: 'photo-contest-details.component.html'
})
export class PhotoContestDetailsComponent {
    id: number;
    @ViewChild('dataTable') _dataTable;

    dataTableSettings = {
        url: this.config.API_URL + 'photo-contest/works',
        title: 'Список работ фото конкурса',
        actions: {
            add: false,
            edit: false,
            delete: false,
            publish: true,
            reject: true,
            export: true
        },
        columns: [
            {
                name: '_id',
                label: 'ID #'
            },
            {
                name: 'screenshot',
                label: 'Изображение',
                data: (row) => {
                    if ( ! row.screenshot ) return '-';
                    return '<a href="' + this.config.BASE_URL + row.screenshot + '" target="_blank"><img width="60" src="' + this.config.BASE_URL + row.screenshot + '"></a>';
                },
                filter: false
            },
            {
                name: 'created_at',
                label: 'Дата',
                order: 'desc',
                filter: {
                    type: 'date'
                }
            },
            {
                name: 'totalLikes',
                label: 'Лайки',
                filter: false
            },
            {
                name: 'user.age',
                label: 'Возраст',
                filter: false,
                data: (row) => {
                    if ( ! row.user ) return '-';
                    if ( ! row.user.age ) return '-';
                    return row.user.age;
                },
            },
            {
                name: 'user.email',
                label: 'Email',
                filter: false,
                data: (row) => {
                    if ( ! row.user ) return '-';
                    return row.user.email;
                },
            },
            {
                name: 'status',
                label: 'Статус',
                data: (row) => {
                    if ( row.status == 0 ) return 'На модерации';
                    if ( row.status == 1 ) return 'Отклонен';
                    if ( row.status == 2 ) return 'Опубликован';
                },
                filter: false
            }
        ]
    };

    constructor(protected api: ApiService, private config: Config, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
    }

    onPublish(row) {
        this.api
            .patch('photo-contest/work/' + row.data()._id, JSON.stringify({status: 2}))
            .then(data => {
                this._dataTable.reload();
            });
    }

    onReject(row) {
        this.api
            .patch('photo-contest/work/' + row.data()._id, JSON.stringify({status: 1}))
            .then(data => {
                this._dataTable.reload();
            });
    }

    onExport() {
        window.open(this.config.API_URL + 'photo-contest/works/export', '_blank');
    }
}