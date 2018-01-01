import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Config } from '../../shared/config';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from './default-modal/default-modal.component';

@Component({
    selector: 'demo',
    templateUrl: 'demo.component.html'
})
export class DemoComponent implements OnInit {

    formSettings = {
        fields: [
            {
                name: 'firstName',
                type: 'text',
                label: 'Имя',
                placeholder: 'Имя',
                validationRules: [
                    { type: 'required' },
                    { type: 'minLength', value: 6 }
                ]
            },
            {
                name: 'lastName',
                type: 'text',
                label: 'Фамилия',
                // placeholder: 'Фамилия',
                validationRules: [
                    { type: 'required' },
                    { type: 'minLength', value: 3 }
                ]
            },
            {
                name: 'image',
                type: 'image',
                label: 'Изображение',
                validationRules: [
                    { type: 'required' }
                ]
            }
        ]
    };

    formSettings2 = {
        fields: [
            {
                name: 'firstName',
                type: 'text',
                label: 'Имя',
                placeholder: 'Имя',
                validationRules: [
                    { type: 'required' },
                    { type: 'minLength', value: 6 }
                ]
            },
            {
                name: 'lastName',
                type: 'text',
                label: 'Фамилия',
                // placeholder: 'Фамилия',
                validationRules: [
                    { type: 'required' },
                    { type: 'minLength', value: 3 }
                ]
            },
            {
                name: 'image',
                type: 'image',
                label: 'Изображение',
                validationRules: [
                    { type: 'required' }
                ]
            }
        ]
    };

    formData = {
        firstName: 'Александр',
        image: {
            created_at: "2017-04-05 19:42:31",
            destination: "uploads/",
            filename: "0a7eb0110d0fb4b90b458b7be5645b0c.png",
            mimeType: "image/png",
            originalName: "Без названия.png",
            path: "uploads/0a7eb0110d0fb4b90b458b7be5645b0c.png",
            size: 2724184,
            updated_at: "2017-04-05 19:42:31",
            _id: "58e51e7766d38132bc0525d0"
        }
    };

    formData2 = {
    };

    datatableSettings = {
        title: 'Демо таблица',
        url: this.config.API_URL + 'demo',
        actions: {
            add: true,
            edit: true,
            delete: true,
        },
        columns: [
            {
                name: '_id',
                label: 'ID #'
            },
            {
                name: 'name',
                label: 'Название'
            },
            {
                name: 'media',
                label: 'Изображение'
            }
        ]
    };

    datatableData = {

    };
    
    constructor(protected api: ApiService, protected config: Config, private modalService: NgbModal) {

    }

    closeResult: string;

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        // const activeModal = this.modalService.open(DefaultModal, {size: 'lg'});
        // activeModal.componentInstance.modalHeader = 'Large Modal';
        // console.log(activeModal);
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    ngOnInit() {
    }

    // closeModal() {
    //     this.activeModal.close();
    // }
}