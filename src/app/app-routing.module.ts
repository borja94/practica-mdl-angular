import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelYesDialogComponent } from './core/cancel-yes-dialog.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProvidersComponent } from './home/providers/providers.component';


const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL },
  { path: WelcomeComponent.URL, component: WelcomeComponent },
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      { path: ProvidersComponent.URL, component: ProvidersComponent },
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
    ProvidersComponent,
    WelcomeComponent,
  ];

  static COMPONENT_FACTORY = [
    CancelYesDialogComponent
  ];
}
