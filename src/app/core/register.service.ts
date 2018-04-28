import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

    constructor(private httpService: HttpService) {}

    public register (dataIn: any): Observable<any> {
        return this.httpService.post('/users', dataIn);
    }
}
