import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { TokensService } from '../core/tokens.service';
import { LoginDialogComponent } from '../core/login-dialog.component';
import { HomeComponent } from '../home/home.component';
import { RegisterService } from '../core/register.service';

@Component({
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
})
export class WelcomeComponent {
  static URL = 'welcome';
  codeValue = '';

  constructor(public dialog: MatDialog,
    private tokensService: TokensService,
    private registerService: RegisterService,
    private router: Router) {
  }

  login() {
    const loginDialog = this.dialog.open(LoginDialogComponent);
    loginDialog.afterClosed().subscribe(
      loginObject => {
        if (loginObject === undefined || !loginObject) {
          return;
        } else if (loginObject.registro) {
          this.registrar(loginObject);
        } else if (!loginObject.registro) {}
          this.autenticar(loginObject);
        }
    );
  }

  registrar (loginObject) {
    const role = loginObject.hotel_resp ? 'HOTEL_RESP' : 'CLIENT';
    const data: any = {
      email: loginObject.email,
      password: loginObject.password,
      role: role
    };
    this.registerService.register(data).subscribe (
      () => {
        // TODO mensaje
       }
    );
  }

  autenticar (loginObject) {
    this.tokensService.login(loginObject.email, loginObject.password).subscribe (
      () => {
        this.router.navigate([HomeComponent.URL]);
      }
    );
  }
}
