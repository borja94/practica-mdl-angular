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
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

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
    UserService
  ]
})
export class AppModule {
}
