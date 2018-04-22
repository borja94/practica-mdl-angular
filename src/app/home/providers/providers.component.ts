import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
    templateUrl: 'providers.component.html'
})
export class ProvidersComponent implements OnInit {
    static URL = 'providers';

    title = 'Providers management';
    columns = ['company'];
    onlyActive = true;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

}
