import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatCheckbox,
    MatCheckboxModule
} from '@angular/material';

import { HttpService } from './http.service';
import { TokensService } from './tokens.service';
import { RegisterService } from './register.service';

import { DateComponent } from './date.component';
import { LoginDialogComponent } from './login-dialog.component';
import { CrudComponent } from './crud.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatCheckboxModule,
    ],
    declarations: [
        DateComponent,
        LoginDialogComponent,
        CrudComponent
    ],
    exports: [
        DateComponent,
        LoginDialogComponent,
        CrudComponent
    ],
    entryComponents: [
        LoginDialogComponent
    ],
    providers: [
        HttpService,
        TokensService,
        RegisterService,
    ]
})
export class CoreModule { }
