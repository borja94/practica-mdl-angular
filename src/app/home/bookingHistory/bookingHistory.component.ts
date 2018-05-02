import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { BookService } from '../shared/book.service';
import { UserService } from '../shared/user.service';

@Component({
    templateUrl: 'bookingHistory.component.html',
    styleUrls: ['bookingHistory.component.css']
})
export class BookingHistoryComponent implements OnInit {
    static URL = 'bookingHistory';
    title = 'Historico de reservas';
    columns = ['company'];
    onlyActive = true;
    bookingData = [];
    constructor(private bookService: BookService, private userService: UserService) {

    }

    ngOnInit(): void {
        this.userService.loggedInUsername().subscribe(
            user => this.updateBookData(user.email)
        );
    }

    updateBookData(email): void {
        this.bookService.getUserbooks(email).subscribe(
            data => {
                this.bookingData.length = 0;
                data.forEach(element => {
                    const date = new Date(element.fecha);
                    this.bookingData.push(
                        {
                            code: element.id,
                            fecha: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
                            hora: element.hora,
                            nombreHotel: element.nombreHotel,
                        }
                    );
                });

                console.log(data);
            }
        );
    }

}
