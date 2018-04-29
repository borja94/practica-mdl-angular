import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HotelService } from '../shared/hotel.service';
import { FormControl } from '@angular/forms';
import { RoomService } from '../shared/room.service';

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
    constructor(private hotelService: HotelService, private roomService: RoomService) {
        this.hotelService.readAllNames().subscribe(
            data => this.hotelNames = data
        );
    }

    ngOnInit(): void {
    }

    searchRoomsByFilters() {
        this.roomService.searchRooms(this.searchDate.value, this.hotels.value, this.roomType.value)
            .subscribe(
                data => {
                    console.log(data);
                    this.roomsData.length = 0;

                    data.forEach(element => {
                        this.roomsData.push(
                            {
                                hotel: element.hotelName,
                                numRooms: 1,
                                description: element.Characteristics,
                            }
                        );
                    });

                    console.log(data);
                }
            );

    }
}
