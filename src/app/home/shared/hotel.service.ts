import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../core/http.service';

@Injectable()
export class HotelService {
    static END_POINT = '/hotel';

    constructor(private httpService: HttpService) {
    }


    readAllNames(): Observable<string[]> {
        return this.httpService.authToken().get(HotelService.END_POINT);
    }


}
