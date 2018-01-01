import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { Config } from '../config';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {
    public token: string;
    private endpoint: string = '';

    constructor(private http: AuthHttp, private config: Config) {
        this.endpoint = config.API_URL;
    }

    private process(response: Response) {
        if ( response.text() == '' ) return '';
        let json: any = response.json();
        if (json && json.errorMessage) {
            throw new Error(json.errorMessage);
        }
        return json;
    }

    private processError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }


    getHeaders(contentType: any = 'application/json') {
        let headers = new Headers();

        if ( contentType ) {
            headers.append('Content-Type', contentType);
        }

        if(this.token) {
            headers.append('Authorization', this.token);
        }
        return {
            headers: headers
        };
    }

    get(url) {
        return this
            .http
            .get(this.endpoint + url, this.getHeaders())
            .toPromise()
            .then(this.process)
            .catch(this.processError);
    }

    post(url, data, contentType: any = 'application/json') {
        return this
            .http
            .post(this.endpoint+ url, data, this.getHeaders(contentType))
            .toPromise()
            .then(this.process);
    }

    put(url, data) {
        return this
            .http
            .put(this.endpoint+ url, data, this.getHeaders())
            .toPromise()
            .then(this.process)
            .catch(this.processError);
    }

    patch(url, data) {
        return this
            .http
            .patch(this.endpoint+ url, data, this.getHeaders())
            .toPromise()
            .then(this.process)
            .catch(this.processError);
    }

    delete(url) {
        return this
            .http
            .delete(this.endpoint+ url, this.getHeaders())
            .toPromise()
            .then(this.process)
            .catch(this.processError);
    }
}