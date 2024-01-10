import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { MatDashboardComponent } from './mat-dashboard/mat-dashboard.component';
const routes: Routes = [
  { path: '', component: MatDashboardComponent },
  { path: 'weather', component: WeatherForecastComponent },
]
  ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
