import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import 'jquery';
import { Router } from "@angular/router";

let $: any;

@Component({
    selector: 'user-create',
    templateUrl: 'user-create.component.html'
})
export class UserCreateComponent implements OnInit {
    formSettings = {
        fields: [
            {
                name: 'email',
                type: 'text',
                label: 'Email',
                placeholder: 'Email',
                validationRules: [
                ]
            },
            {
                name: 'password',
                type: 'text',
                label: 'Пароль',
                placeholder: 'Пароль',
                validationRules: [
                ]
            },
            {
                name: 'role',
                type: 'select',
                label: 'Права',
                options: [
                    { title: 'Пользователь', value: 0 },
                    { title: 'Суперюзер', value: 1 }
                ],
                validationRules: [
                    { type: 'required' }
                ]
            }
        ]
    };

    formData = {
    };

    constructor(protected api: ApiService, protected router: Router) {
    }

    onSubmit() {
        this.api
            .post('user', JSON.stringify(this.formData))
            .then(data => this.router.navigate(['pages/users']));
    }

    ngOnInit() {
    }
}