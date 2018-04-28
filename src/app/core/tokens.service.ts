import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

import { Role } from './role.model';

@Injectable()
export class TokensService {
    static END_POINT = '/login';
    static USERNAME = '/username';

    constructor(private httpService: HttpService) {
    }

    login(email: string, password: string): Observable<any> {
        return this.httpService.login(email, password, TokensService.END_POINT);
    }

    logout(): void {
        this.httpService.logout();
    }

}
