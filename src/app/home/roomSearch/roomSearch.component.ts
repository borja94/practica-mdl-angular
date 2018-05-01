import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
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
    searchDate = new FormControl(new Date());

    title = 'Busqueda de reservas';
    columns = ['company'];
    onlyActive = true;
    roomsData = [];
    hotelNames: string[];
    constructor(private hotelService: HotelService, private roomService: RoomService, private router: Router,) {
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
        this.roomService.searchRooms(this.searchDate.value, hotelSelected, roomTypeSelected)
            .subscribe(
                data => {
                    console.log(data);
                    this.roomsData.length = 0;

                    data.forEach(element => {
                        this.roomsData.push(
                            {
                                id: 1,
                                hotel: element.hotelName,
                                numRooms: 1,
                                description: element.characteristics,
                                roomType: element.roomType,
                            }
                        );
                    });
                }
            );

    }
    bookRoom(id) {
        this.router.navigate([HomeComponent.URL, RoomBookingComponent.URL]);
        console.log(id);
    }
}
