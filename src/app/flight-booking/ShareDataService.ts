import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ShareDataService {

    public content = new BehaviorSubject<any>(null);
    public share = this.content.asObservable();
    constructor(private http: HttpClient) { }

    public setDisplayData(data: any) {
        this.content.next(data);
    }
}  