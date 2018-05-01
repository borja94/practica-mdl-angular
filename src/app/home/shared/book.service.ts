import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../core/http.service';
import { Book } from './book.model';

@Injectable()
export class BookService {
    static END_POINT = '/reserva';

    constructor(private httpService: HttpService) {
    }


    book(id:string, nombreHotel: string, nombreUsuario: string, fecha: Date, fechaSalida: Date, hora: string, horaSalida: string) {
        return this.httpService.authToken()
            .param('id', id.toString())
            .param('nombreHotel', nombreHotel.toString())
            .param('nombreUsuario', nombreUsuario.toString())
            .param('fecha', fecha.toISOString())
            .param('fechaSalida', fechaSalida.toISOString())
            .param('hora', hora.toString())
            .param('horaSalida', horaSalida.toString())
            .post(BookService.END_POINT);
    }

    getUserbooks(nombreUsuario: string): Observable<Book[]> {
        return this.httpService.authToken()
            .param('nombreUsuario', nombreUsuario.toString())
            .get(BookService.END_POINT);
    }


}
