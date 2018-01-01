import {Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'user-details',
    templateUrl: 'user-details.component.html',
    styles: ['table td { text-align:left !important; }', 'table td:first-child { font-weight: bold; }', 'table img { max-width: 200px; margin: 10px 0; }']
})
export class UserDetailsComponent implements OnInit {
    id: number;

    formData: any = false;

    constructor(protected api: ApiService, protected router: Router, private route: ActivatedRoute) {
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