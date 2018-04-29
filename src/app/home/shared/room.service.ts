import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../core/http.service';

@Injectable()
export class RoomService {
    static END_POINT = '/room';

    constructor(private httpService: HttpService) {
    }


    searchRooms(dateSearch: Date, hotels: string[], roomTypes: string[]) {
        return this.httpService.authToken()
            .param('searchDate', dateSearch.toISOString())
            .param('hotelsName', hotels.toString())
            .param('roomTypes', roomTypes.toString())
            .get(RoomService.END_POINT);
    }


}
