import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
    templateUrl: 'roomBooking.component.html'
})
export class RoomBookingComponent implements OnInit {
    static URL = 'roomBooking';

    title = 'Reserva de habitaciones';
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
    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

}
