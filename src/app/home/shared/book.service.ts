import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../../core/http.service';
import { Book } from './book.model';

@Injectable()
export class BookService {
    static END_POINT = '/reserva';

    constructor(private httpService: HttpService) {
    }


    book(id: string, nombreHotel: string, nombreUsuario: string,
        fecha: Date, fechaSalida: Date, hora: string, horaSalida: string): Observable<string> {
        const reserva = {
            nombreHotel: nombreHotel.toString(),
            nombreUsuario: nombreUsuario,
            fecha: fecha.toISOString(),
            fechaSalida: fechaSalida.toISOString(),
            hora: hora.toString(),
            horaSalida: horaSalida.toString(),
            idHabitacion: id.toString()
        };
        return this.httpService.authToken()
            .post(BookService.END_POINT, reserva);
    }

    getUserbooks(nombreUsuario: string): Observable<Book[]> {
        return this.httpService.authToken()
            .param('nombreUsuario', nombreUsuario.toString())
            .get(BookService.END_POINT);
    }


}
