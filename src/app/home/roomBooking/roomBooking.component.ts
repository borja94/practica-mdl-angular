import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { RoomSearchComponent } from '../roomSearch/roomSearch.component';
import { HotelService } from '../shared/hotel.service';
import { FormControl } from '@angular/forms';
import { RoomService } from '../shared/room.service';
import { Book } from '../shared/book.model';
import { BookService } from '../shared/book.service';

@Component({
    templateUrl: 'roomBooking.component.html'
})
export class RoomBookingComponent implements OnInit {
    static URL = 'roomBooking';

    title = 'Reserva de habitaciones';
    columns = ['company'];
    onlyActive = true;
    fecha = new FormControl(new Date());
    fechaSalida = new FormControl(new Date());

    constructor(private router: Router,private hotelService: HotelService, private roomService: RoomService, private bookService: BookService) {
    }

    ngOnInit(): void {

    }

    cancel(){
        this.router.navigate(['/roomSearch']);
    }
    
    book(book: Book){
        this.bookService.book(book.nombreHotel, book.nombreUsuario, book.fecha, book.fechaSalida, book.hora, book.horaSalida);
    }
}
