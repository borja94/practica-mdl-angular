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
import { ToastrService } from 'ngx-toastr';

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
        private bookService: BookService,
        private toast: ToastrService) {
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
        if (this.hora.value == null || this.horaSalida.value == null || this.fecha.value == null || this.fechaSalida.value == null) {
            this.toast.warning('Debe rellenar todos los campos de los filtros');
        }
        // tslint:disable-next-line:one-line
        else if (Number.parseInt(this.hora.value) >= Number.parseInt(this.horaSalida.value)) {
            this.toast.warning('La hora de salida debe ser mayor que la hora de entrada');
        }
        // tslint:disable-next-line:one-line
        else if (new Date(this.fecha.value) > new Date(this.fechaSalida.value)) {
            this.toast.warning('La fecha de salida debe ser mayor o igual que la fecha de entrada');
        }
        // tslint:disable-next-line:one-line
        else if (Number.parseInt(this.hora.value) < 0 || Number.parseInt(this.hora.value) > 23 ||
            Number.parseInt(this.horaSalida.value) < 0 || Number.parseInt(this.horaSalida.value) > 23) {
            this.toast.warning('Las horas introducidas deben estar entre 0 y 23');
        }
        // tslint:disable-next-line:one-line
        else {
            console.log('reservo');
            const fEntrada = new Date(this.fecha.value.getFullYear(),
                this.fecha.value.getMonth(),
                this.fecha.value.getDay());
            const fSalida = new Date(this.fechaSalida.value.getFullYear(),
                this.fechaSalida.value.getMonth(),
                this.fechaSalida.value.getDay());

            this.bookService.book(this.reservaService.reserva.idRoom,
                this.nombreHotel,
                this.nombreUsuario,
                fEntrada,
                fSalida,
                this.hora.value + ':00',
                this.horaSalida.value + ':00').subscribe(
                    data => console.log(data)
                );
        }
    }
}
