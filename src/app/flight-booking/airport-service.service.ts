import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirportServiceService {
  airports: any[] = [];
  sourceDestination: any[] = [];
  constructor(private http: HttpClient) { }
  getAirportList(): any {
    const headers = new HttpHeaders()
      .set('Tenant-Identifier', '9d7d6eeb25cd6083e0df323a0fff258e59398a702fac09131275b6b1911e202d');
    this.http.get(environment.apiBase, { 'headers': headers }).subscribe(data => {
      var list = JSON.parse(JSON.stringify(data)).airports;
      if (list != null) {
        for (let i = 0; i < list.length; i++) {
          this.sourceDestination = [];
          this.sourceDestination = list[i].connections;
          for (let j = 0; j < this.sourceDestination.length; j++) {
            if (this.sourceDestination[j].name != "") {
              this.airports.push(this.sourceDestination[j]);
            }
          }
        }
      }
    })
    return this.airports;
  }
}