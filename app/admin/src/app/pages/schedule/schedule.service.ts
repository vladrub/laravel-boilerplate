import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ScheduleService {
    constructor (private _http: Http) {}

    getData(): Promise<any> {
        return this._http.get( 'http://vr.gulli.prestoheads.com/api/schedule' )
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log('Произошла ошибка', error);
    }
}
