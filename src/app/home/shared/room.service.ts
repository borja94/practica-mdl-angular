import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../core/http.service';

@Injectable()
export class RoomService {
    static END_POINT = '/room';

    constructor(private httpService: HttpService) {
    }


    searchRooms(fecha: Date, fechaSalida: Date, hora: string, horaSalida: string, hotels: string[], roomTypes: string[]) {
        console.log(hora);
        return this.httpService.authToken()
            .param('startDate', fecha.toISOString())
            .param('endDate', fechaSalida.toISOString())
            .param('startHour', hora)
            .param('endHour', horaSalida)
            .param('hotelsName', hotels.toString())
            .param('roomTypes', roomTypes.toString())
            .get(RoomService.END_POINT);
    }


}
