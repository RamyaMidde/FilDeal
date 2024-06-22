import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

var api = environment.Api

@Injectable({
  providedIn: 'root'
})
export class CoupunService {

  constructor(private http: HttpClient) { }


  getBannersImgs() {
    return this.http.get(api + `getbanners`);
  }



}
