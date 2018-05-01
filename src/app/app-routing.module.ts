import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelYesDialogComponent } from './core/cancel-yes-dialog.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RoomSearchComponent } from './home/roomSearch/roomSearch.component';
import { RoomBookingComponent } from './home/roomBooking/roomBooking.component';


const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL },
  { path: WelcomeComponent.URL, component: WelcomeComponent },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: RoomSearchComponent.URL, component: RoomSearchComponent },
      { path: RoomBookingComponent.URL, component: RoomBookingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static COMPONENTS = [
    HomeComponent,
    WelcomeComponent,
    RoomSearchComponent,
    RoomBookingComponent,
  ];

  static COMPONENT_FACTORY = [
    CancelYesDialogComponent
  ];
}
