import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { CoreModule } from './core/core.module';

import { HttpService } from './core/http.service';
import { TokensService } from './core/tokens.service';
import { UserService } from './home/shared/user.service';
import { HotelService} from './home/shared/hotel.service';
import { RoomService} from './home/shared/room.service';
import { BookService} from './home/shared/book.service';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
    AppMaterialModule,

    CdkTableModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    CoreModule,
    ChartsModule

  ],
  declarations: [
    AppComponent,
    AppRoutingModule.COMPONENTS,
    AppRoutingModule.COMPONENT_FACTORY
  ],
  entryComponents: [AppRoutingModule.COMPONENT_FACTORY],
  bootstrap: [AppComponent],
  providers: [
    UserService,
    HotelService,
    RoomService,
    BookService,
  ]
})
export class AppModule {
}
