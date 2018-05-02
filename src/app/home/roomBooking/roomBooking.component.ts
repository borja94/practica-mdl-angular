import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { RoomSearchComponent } from '../roomSearch/roomSearch.component';
import { HomeComponent } from '../home.component';
import { HotelService } from '../shared/hotel.service';
import { FormControl } from '@angular/forms';
import { RoomService } from '../shared/room.service';
import { UserService } from '../shared/user.service';
import { Book } from '../shared/book.model';
import { BookService } from '../shared/book.service';
import { ReservaService } from '../../core/reserva.service';

@Component({
    templateUrl: 'roomBooking.component.html',
    styleUrls: ['roomBooking.component.css']
})
export class RoomBookingComponent implements OnInit {
    static URL = 'roomBooking';

    book: Book;
    title = 'Reserva de habitaciones';
    columns = ['company'];
    onlyActive = true;
    idRoom: string;

    fecha = new FormControl();
    fechaSalida = new FormControl();
    hora = new FormControl();
    nombreHotel: string;
    horaSalida = new FormControl();
    nombreUsuario: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private hotelService: HotelService,
        private reservaService: ReservaService,
        private userService: UserService,
        private roomService: RoomService,
        private bookService: BookService) {
        this.userService.loggedInUsername().subscribe(user => this.nombreUsuario = user.email);
    }

    ngOnInit(): void {
        this.fecha.setValue(this.reservaService.reserva.fechaEntrada);
        this.fechaSalida.setValue(this.reservaService.reserva.fechaSalida);
        this.hora.setValue(this.reservaService.reserva.horaEntrada);
        this.horaSalida.setValue(this.reservaService.reserva.horaSalida);
        this.nombreHotel = this.reservaService.reserva.nombreHotel;
    }

    cancel() {
        this.router.navigate([HomeComponent.URL, RoomSearchComponent.URL]);
    }

    bookRoom() {

        this.bookService.book(this.reservaService.reserva.idRoom,
            this.reservaService.reserva.nombreHotel, this.nombreUsuario,
            this.reservaService.reserva.fecha.value, this.reservaService.reserva.fechaSalida.value,
            this.reservaService.reserva.hora.value + ':00',
            this.reservaService.reserva.horaSalida.value + ':00');
    }
}
