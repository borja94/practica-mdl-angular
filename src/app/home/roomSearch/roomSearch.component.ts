import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
    templateUrl: 'roomSearch.component.html'
})
export class RoomSearchComponent implements OnInit {
    static URL = 'roomSearch';

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
    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

}
