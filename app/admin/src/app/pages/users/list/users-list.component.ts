import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Config } from '../../../shared/config';
import { Router } from "@angular/router";

@Component({
    selector: 'users',
    templateUrl: 'users-list.component.html'
})
export class UsersListComponent {
    @ViewChild('dataTable') _dataTable;

    dataTableSettings = {
        url: this.config.API_URL + 'users',
        title: 'Список пользователей',
        actions: {
            add: true,
            details: true,
            edit: true,
            delete: true,
        },
        columns: [
            {
                name: '_id',
                label: 'ID #'
            },
            {
                name: 'fullName',
                label: 'Имя'
            },
            {
                name: 'email',
                label: 'Email'
            },
            {
                name: 'role',
                label: 'Права',
                data: (row) => {
                    if ( row.role == 1 ) return '<span class="badge badge-success">Суперюзер</span>';
                    else return '<span class="badge badge-danger">Пользователь</span>';
                },
            }
        ]
    };

    constructor(protected api: ApiService, private config: Config, private router: Router) {  }

    onCreate() {
        this.router.navigate(['pages/users/create']);
    }

    onDetails(row) {
        this.router.navigate(['pages/users/details', row.data()._id]);
    }

    onEdit(row) {
        this.router.navigate(['pages/users/edit', row.data()._id]);
    }

    onDelete(row) {
        this.api
            .delete('user/' + row.data()._id)
            .then(data => {
                row.draw();
            });
    }

    loadHeroes() {
        this._dataTable.reload();
    }
}