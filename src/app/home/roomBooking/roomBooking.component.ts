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

@Component({
    templateUrl: 'roomBooking.component.html'
})
export class RoomBookingComponent implements OnInit {
    static URL = 'roomBooking/:idRoom/hotel/:hotel';

    book: Book;
    title = 'Reserva de habitaciones';
    columns = ['company'];
    onlyActive = true;
    idRoom: string;

    fecha = new FormControl(new Date());
    fechaSalida = new FormControl(new Date());
    hora = new FormControl();
    nombreHotel = new FormControl();
    horaSalida = new FormControl();
    nombreUsuario: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private hotelService: HotelService,
        private userService: UserService,
        private roomService: RoomService,
        private bookService: BookService) {
        this.userService.loggedInUsername().subscribe(user => this.nombreUsuario = user.email);
        this.nombreHotel.setValue(this.route.snapshot.params['hotel']);
        this.idRoom = this.route.snapshot.params['idRoom'];
    }

    ngOnInit(): void {

    }

    cancel() {
        this.router.navigate([HomeComponent.URL, RoomSearchComponent.URL]);
    }

    bookRoom() {
        this.bookService.book(this.idRoom,
            this.nombreHotel.value, this.nombreUsuario,
            this.fecha.value, this.fechaSalida.value, this.hora.value + ':00',
            this.horaSalida.value + ':00');
    }
}