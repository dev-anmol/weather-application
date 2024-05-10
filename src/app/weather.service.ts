import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '36182b7d6678cb2c4bb982f2b5c508a6';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


  constructor(private http: HttpClient) {}

  getWeather(cities: string[]): Observable<any> {
    const params = new HttpParams()
      .set('appid', this.apiKey)
      .set('units', 'metric');

    const weatherRequests = cities.map((city) =>
      this.http.get(this.apiUrl, { params: params.set('q', city) })
    );

    return forkJoin(weatherRequests);
  }

  searchWeatherByCity(cityName: string): Observable<any>{
    const params = new HttpParams()
    .set('appid', this.apiKey)
    .set('units', 'metric')
    .set('q', cityName);

    return this.http.get(this.apiUrl, {params: params});
  }
  



}
