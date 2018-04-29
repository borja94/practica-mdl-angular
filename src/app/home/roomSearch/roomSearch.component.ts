import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HotelService } from '../shared/hotel.service';
import { FormControl } from '@angular/forms';

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
    roomsData = [
        {
            hotel: 'hotel 1',
            numRooms: 3,
            description: 'jsakldjslkjasdlkjsa'
        },
        {
            hotel: 'hotel 1',
            numRooms: 3,
            description: 'jsakldjslkjasdlkjsa'
        },
        {
            hotel: 'hotel 1',
            numRooms: 3,
            description: 'jsakldjslkjasdlkjsa'
        },
        {
            hotel: 'hotel 1',
            numRooms: 3,
            description: 'jsakldjslkjasdlkjsa'
        },
    ];
    hotelNames: string[];
    constructor(private hotelService: HotelService) {
        this.hotelService.readAllNames().subscribe(
            data => this.hotelNames = data
        );
    }

    ngOnInit(): void {
    }

    searchRoomsByFilters() {

        console.log(this.hotels.value);
        console.log(this.roomType.value);
        console.log(this.searchDate.value);
    }
}
