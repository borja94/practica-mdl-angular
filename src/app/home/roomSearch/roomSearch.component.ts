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

    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

}
