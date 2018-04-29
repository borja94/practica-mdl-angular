import { Component} from '@angular/core';

@Component({
    templateUrl: 'login-dialog.component.html',
    styleUrls: ['dialog.component.css']
})
export class LoginDialogComponent {
    registro = false;
    hotel_resp: boolean;
    email: string;
    password: string;
    title = 'Entrar';

    setRegistroMode () {
        this.registro = true;
        this.title = 'Registro';
    }
}
