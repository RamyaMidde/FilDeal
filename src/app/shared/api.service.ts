import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

var api = environment.Api

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ApiUrl = "http://localhost:3000/";

  
  constructor(private http: HttpClient) {  
  }

  /* coupounMated api keys start */   

  getMerchantsData() {
    return this.http.get("http://localhost:3000/merchants");
  }
  

  getCategries() {
    return this.http.get(this.ApiUrl + `offersData`);
  }

  getOfferData() {
    return this.http.get(this.ApiUrl + `offersData`);
  }

  getMerchants() {
    return this.http.get(this.ApiUrl + `merchants`);
  }


  getCoupons() {
    return this.http.get(`https://couponapi.org/api/getCategories/?API_KEY=2f114d4c4129c9425c5dee2a6aaad703`);
  }

  getCaterMenus() {
    return this.http.get(this.ApiUrl + `catergires`);
  }




  getBannersImgs() {
    return this.http.get(api + `getbanners`);
  }

  getOffers() {
    return this.http.get(api + `getoffers`);
  }

  getCatergoryItems() {
    return this.http.get(api + `getcategorytotal`);
  }

  /* getCatryListCntrl */
  getCatryList() {
    return this.http.get(api + `getCatryList`);
  }

  getCatgry(id: any) {
    return this.http.get(api + `getCatgry/` + id);
  }

  getRechargeStoreCatgry(id: any) {
    return this.http.get(api + `getRechargeCatgry/` + id)
  }

  getCoupnOffers(data: any) {
    return this.http.post(api + `getCouponOffers`, data);
  }

  /* getCatryCount */
  getCatryCount() {
    return this.http.get(api + `getCatryCount`);
  }

  /* get food stores */
  getFoodStores() {
    return this.http.get(api + `getFoodStores`);
  }

  /* getRecharg */
  getRecharg() {
    return this.http.get(api + `getRecharg`);
  }

  /* getFoodCatgry */
  getFoodCatgryData(data: any) {
    console.log(63, data);

    return this.http.post(api + `getFoodCatgryData`, data)
  }

  /* today BestOffers */
  getTodayOffers(id: any) {
    console.log(66, id);
    return this.http.get(api + `getTodayOffers/` + id)
  }

  /* signup */
  /* addSignup */

  addSignUp(data: any) {
    return this.http.post(api + `addSignup`, data)
  }

  /* user login */

  getLoginUser(data: any) {
    var email = data.email;
    var password = data.password;
    return this.http.get(api + `getLogin/` + email + '/' + password);
  }

  /* getTopStore  */
  getTopStore() {
    return this.http.get(api + `getTopStore`);
  }

  /* getbestStore  */
  getBestOffers() {
    return this.http.get(api + `getBestOffers`);
  }

  /* getCollections-sales  */
  getCollectionSales() {
    return this.http.get(api + `getCollectionSales`);
  }



}
