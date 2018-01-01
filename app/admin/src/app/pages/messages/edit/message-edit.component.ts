import {Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'message-edit',
    templateUrl: 'message-edit.component.html'
})
export class MessageEditComponent implements OnInit {
    id: number;
    @ViewChild('formBuilder') _formBuilder;

    formSettings = {
        fields: [
            {
                name: 'email',
                type: 'text',
                label: 'Email',
                placeholder: '',
                validationRules: [
                    { type: 'required' }
                ]
            },
            {
                name: 'from',
                type: 'text',
                label: 'Имя',
                placeholder: '',
                validationRules: [
                    { type: 'required' }
                ]
            },
            {
                name: 'subject',
                type: 'text',
                label: 'Тема',
                placeholder: '',
                validationRules: [
                    { type: 'required' }
                ]
            },
            {
                name: 'text',
                type: 'textarea',
                label: 'Сообщение',
                placeholder: '',
                validationRules: [
                    { type: 'required' }
                ]
            },
            {
                name: 'answer',
                type: 'textarea',
                label: 'Ответ',
                placeholder: '',
                validationRules: [
                ]
            },
        ]
    };

    formData: any = false;

    constructor(protected api: ApiService, protected router: Router, private route: ActivatedRoute) {
    }

    onSubmit() {
        this.api
            .patch('message/' + this.id, JSON.stringify(this.formData))
            .then(data => this.router.navigate(['pages/messages/list']));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.api
            .get('message/' + this.id)
            .then(data => {
                this.formData = data;
            });
    }
}