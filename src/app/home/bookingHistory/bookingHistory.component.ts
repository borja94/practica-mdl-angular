import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
    templateUrl: 'bookingHistory.component.html'
})
export class BookingHistoryComponent implements OnInit {
    static URL = 'bookingHistory';
    hotels = new FormControl();
    roomType = new FormControl();
    searchDate = new FormControl(new Date());

    title = 'Historico de reservas';
    columns = ['company'];
    onlyActive = true;
    roomsData = [];
    hotelNames: string[];
    constructor() {

    }

    ngOnInit(): void {

    }

}
