import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import 'style-loader!./login.scss';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { Config } from '../../shared/config';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, public router: Router, public http: Http, private config: Config, private _notificationsService: NotificationsService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      let formData:FormData = new FormData();

      formData.append('email', values['email']);
      formData.append('password', values['password']);

      this.http.post(this.config.API_URL + 'auth/login', formData)
          .subscribe(
              response => {
                this._notificationsService.success(
                    'Успех!',
                    'Вы успешно авторизовались.'
                );

                localStorage.setItem('token', response.json().token);
                this.router.navigate(['pages']);
              },
              error => {
                if ( error.status_code = 403 ) {
                  this._notificationsService.error(
                      'Ошибка!',
                      'Вы ввели неверный логин и/или пароль.'
                  );
                } else {
                  this._notificationsService.error(
                      'Ошибка!',
                      error.text()
                  );
                }
              }
          );

    }
  }
}
