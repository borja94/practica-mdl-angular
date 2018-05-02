import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HotelService } from '../shared/hotel.service';
import { FormControl } from '@angular/forms';
import { RoomService } from '../shared/room.service';
import { HomeComponent } from '../home.component';
import { RoomBookingComponent } from '../roomBooking/roomBooking.component';
import { ToastrService } from 'ngx-toastr';
import { ReservaService } from '../../core/reserva.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
    templateUrl: 'roomSearch.component.html',
    styleUrls: ['roomSearch.component.css']
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
    roomTypesCollection = ['SINGLE', 'DOUBLE', 'TRIPLE', 'SUITE'];


    constructor(private hotelService: HotelService,
        private roomService: RoomService,
        private reservaService: ReservaService,
        private router: Router,
        private toast: ToastrService) {
        this.hotelService.readAllNames().subscribe(
            data => {
                this.hotelNames = data;
                this.hotels.setValue(data);
            }
        );

        this.roomType.setValue(this.roomTypesCollection);

    }

    ngOnInit(): void {
        // this.searchRoomsByFilters();
    }


    searchRoomsByFilters() {
        this.roomsData = [];
        const hotelSelected = this.hotels.value != null ? this.hotels.value : '';
        const roomTypeSelected = this.roomType.value != null ? this.roomType.value : '';

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
            console.log(Number.parseInt(this.hora.value));
            console.log(Number.parseInt(this.horaSalida.value));
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

    reservar(idRoom: string, nombreHotel: string) {

        const reserva: any = {
            idRoom: idRoom,
            nombreHotel: nombreHotel,
            nombreUsuario: '',
            fechaEntrada: this.fecha.value,
            fechaSalida: this.fechaSalida.value,
            horaEntrada: this.hora.value,
            horaSalida: this.horaSalida.value
        };

        this.reservaService.reserva = reserva;

        this.router.navigate(['/home/roomBooking']);
    }
}
