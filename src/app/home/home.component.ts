import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from './shared/user.model';
import { TokensService } from '../core/tokens.service';
import { UserService } from './shared/user.service';
import { CancelYesDialogComponent } from '../core/cancel-yes-dialog.component';
import { ProvidersComponent } from './providers/providers.component';
import { HttpService } from '../core/http.service';
import { Role } from '../core/role.model';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent {
  static URL = 'home';

  cashierClosed: boolean;
  username: string;
  role: Role;

  constructor(private dialog: MatDialog, private tokensService: TokensService,
    private router: Router,
    private userService: UserService,
    private httpService: HttpService) {
      this.role = this.httpService.getToken().role;
  }

  home() {
    this.router.navigate([HomeComponent.URL, ProvidersComponent.URL]);
  }

  logout() {
    this.tokensService.logout();
  }
}
