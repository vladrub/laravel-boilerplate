import {Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'user-edit',
    templateUrl: 'user-edit.component.html'
})
export class UserEditComponent implements OnInit {
    id: number;
    @ViewChild('formBuilder') _formBuilder;

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

    formData: any = false;

    constructor(protected api: ApiService, protected router: Router, private route: ActivatedRoute) {
    }

    onSubmit() {
        this.api
            .patch('user/' + this.id, JSON.stringify(this.formData))
            .then(data => this.router.navigate(['pages/users']));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.api
            .get('user/' + this.id)
            .then(data => {
                this.formData = data;
            });
    }
}