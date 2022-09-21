import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareDataService } from './ShareDataService';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AirportServiceService } from './airport-service.service';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.scss']
})
export class FlightBookingComponent implements OnInit {
  defaultAirport: any = { name: "Select Airport", code: "" };
  destinationSelection: any = {};
  originSelection: any = {};
  departureDate = new Date().toISOString().slice(0, 10);
  minDate = new Date().toISOString().slice(0, 10);
  adults = 0;
  childrens = 0;
  infants = 0;
  airports: any[] = [];
  closeResult: string = '';

  constructor(private http: HttpClient, private serviceShared: ShareDataService, private modalService: NgbModal, private serviceAirport: AirportServiceService) {
    this.destinationSelection = this.defaultAirport;
    this.originSelection = this.defaultAirport;
  }

  ngOnInit(): void {
    this.airports = this.serviceAirport.getAirportList();
    this.airports.unshift(this.defaultAirport)
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  minusPlusAdults(type: string) {
    if (type == 'plus') {
      this.adults += 1;
    }
    else {
      if (this.adults > 0) {
        this.adults -= 1;
      }
    }
  }

  minusPlusChildrens(type: string) {
    if (type == 'plus') {
      this.childrens += 1;
    }
    else {
      if (this.childrens > 0) {
        this.childrens -= 1;
      }
    }
  }

  minusPlusInfants(type: string) {
    if (type == 'plus') {
      this.infants += 1;
    }
    else {
      if (this.infants > 0) {
        this.infants -= 1;
      }
    }
  }

  displayData() {
    if (this.originSelection == this.destinationSelection) {
      alert('Origin and Destination airport should not be same');
    }
    else {
      var data = {
        originSelection: this.originSelection,
        destinationSelection: this.destinationSelection,
        departureDate: this.departureDate,
        travelers: {
          adults: this.adults,
          childrens: this.childrens,
          infants: this.infants
        }
      }
      this.serviceShared.setDisplayData(data);
    }
  }
}
