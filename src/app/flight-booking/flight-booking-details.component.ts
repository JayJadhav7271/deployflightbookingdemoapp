import { Component, OnInit } from '@angular/core';
import { ShareDataService } from './ShareDataService';

@Component({
  selector: 'app-flight-booking-details',
  templateUrl: './flight-booking-details.component.html',
  styleUrls: ['./flight-booking-details.component.scss']
})
export class FlightBookingDetailsComponent implements OnInit {
  instance: any = null;
  constructor(private service: ShareDataService) {
  }

  ngOnInit(): void {
    this.service.content.subscribe(data => {
      this.instance = data;
    })
  }

}
