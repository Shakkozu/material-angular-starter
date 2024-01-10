import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { WeatherForecastEntry, WeatherForecastMaterialTableDataSource } from './material-table-datasource';



@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.scss'
})


export class WeatherForecastComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<WeatherForecastEntry>;
  public dataSource: WeatherForecastMaterialTableDataSource = new WeatherForecastMaterialTableDataSource([]);  
  private readonly url = 'https://localhost:7171/WeatherForecast';

  constructor (private http: HttpClient) {
    this.getWeatherForecast();
  }
  displayedColumns = ['date', 'temperature', 'summary'];
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getWeatherForecast() {
    this.http.get <WeatherForecastEntry[]>(this.url)
      .subscribe((data) => {
        this.dataSource = new WeatherForecastMaterialTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
  }
  
}
