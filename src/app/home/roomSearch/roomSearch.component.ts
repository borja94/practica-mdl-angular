import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HotelService } from '../shared/hotel.service';
import { FormControl } from '@angular/forms';
import { RoomService } from '../shared/room.service';
import { HomeComponent } from '../home.component';
import { RoomBookingComponent } from '../roomBooking/roomBooking.component';

@Component({
    templateUrl: 'roomSearch.component.html'
})
export class RoomSearchComponent implements OnInit {
    static URL = 'roomSearch';
    hotels = new FormControl();
    roomType = new FormControl();
    fecha = new FormControl(new Date());
    fechaSalida = new FormControl(new Date());
    hora = new FormControl();
    nombreHotel = new FormControl();
    horaSalida = new FormControl();

    title = 'Busqueda de reservas';
    columns = ['company'];
    onlyActive = true;
    roomsData = [];
    hotelNames: string[];
    constructor(private hotelService: HotelService, private roomService: RoomService,
        private router: Router, public snackBar: MatSnackBar) {
        this.hotelService.readAllNames().subscribe(
            data => this.hotelNames = data
        );
    }

    ngOnInit(): void {
        this.searchRoomsByFilters();
    }


    searchRoomsByFilters() {
        const hotelSelected = this.hotels.value != null ? this.hotels.value : '';
        const roomTypeSelected = this.roomType.value != null ? this.roomType.value : '';

        if (this.hora.value == null || this.horaSalida.value == null || this.fecha.value == null || this.fechaSalida.value == null) {
            this.snackBar.open('Debe rellenar todos los campos de los filtros', 'close');
        }
        // tslint:disable-next-line:one-line
        else {
            this.roomService.searchRooms(this.fecha.value, this.fechaSalida.value,
                this.hora.value + ':00', this.horaSalida.value + ':00', hotelSelected, roomTypeSelected)
                .subscribe(
                    data => {
                        console.log(data);
                        this.roomsData.length = 0;

                        data.forEach(element => {
                            let repetida = false;
                            this.roomsData.forEach(elementAux => {
                                if (element.id === elementAux.id) {
                                    repetida = true;
                                }
                            });
                            if (!repetida) {
                                this.roomsData.push(
                                    {
                                        id: element.id,
                                        hotel: element.hotelName,
                                        numRooms: 1,
                                        description: element.characteristics,
                                        roomType: element.roomType,
                                    }
                                );
                            }
                        });
                    }
                );
        }
    }

    bookRoom(id, nombreHotel) {
        this.router.navigate(['/roomSearch', { id: 1 }]);
        console.log(id);
    }
}
