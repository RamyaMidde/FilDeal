import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


var apiUrl = environment.Api

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {

  constructor(private http: HttpClient) {
  }

  getOfferData() {
    return this.http.get(apiUrl + '/getOffersData');
  }

  getMerchantsData() {
    return this.http.get(apiUrl + '/getMerchants');
  }

  getCatergries() {
    return this.http.get(apiUrl + '/getCatergies');
  }

  getToBrands() {
    return this.http.get(apiUrl + '/getTopBrands');
  }

  getCoupnOffers(id: any) {
    return this.http.get(apiUrl + '/getTopBrands/' + id);
  }

  getOfferDataId(data: any) {
   var OfferData = {
      'storeId': data.storeId,
      'subCategryId': data.subCategryId
    }
    return this.http.post( apiUrl + `/getOfferDat`, OfferData);
  }

  /* getMerhcanta with catergryId */

  getMerchantsId(id: any) {
    return this.http.get(apiUrl + '/getMerchantsId/' + id);
  }


  getBannersImg() {
    return this.http.get(apiUrl + '/getBannersImg');
  }

  getExclusiveImg() {
    return this.http.get(apiUrl + '/getExclusiveImg');
  }


 
  addCustmrRegistr(data:any){
    console.log(63, data);
    return this.http.post(apiUrl + '/customerSignup', data);
  }


  getLogin(data:any){
    console.log(69, data);
    return this.http.post(apiUrl + '/getLoginCustmr', data)
  }

  /* getOfferGroup */
  getOfferGroup(){
    return this.http.get(apiUrl + '/getOfferGroup')
  }


  getMerchantsIdStore(id:any){
    console.log(79,id);
    return this.http.get(apiUrl + '/getMerchantsIdStore/' + id)
  }

  getHighCashback() {
     return this.http.get(apiUrl + '/getHighCashback');
  }

  gettopStoreDashbard(){
    return this.http.get(apiUrl + '/gettopStoreDashbard');

  }

  getbestOffers() {
    return this.http.get(apiUrl + '/getbestOffers');
  }

  /* getbestOfferId subcatergory */
  getbestOfferListId(data:any){
    console.log(98, data);
    return this.http.post(apiUrl + '/bestOfferListId', data)
  }

  getwallet(){
    return this.http.get(apiUrl + '/getWallet');
  }

  /* getfestival getBanks getsales getspical getpromotion */
  getBanks(){
    return this.http.get(apiUrl + '/getBanks');
  }

  getsales(){
    return this.http.get(apiUrl + '/getsales');
  }
  getspical(){
    return this.http.get(apiUrl + '/getspical');
  }
  getpromotion(){
    return this.http.get(apiUrl + '/getpromotion');
  }

  getfestival() {
    return this.http.get(apiUrl + '/getfestival'); 
  }

  /* get recharget categry */
  getRechargeCatgry() {
    return this.http.get(apiUrl + '/getRechargetCatgry');
  }

  /* subscribe data */

  addCustmrSubscribe(data:any) {
    console.log(134, data);
    
    return this.http.post(apiUrl + '/addSubscribeCustmr', data)
  }

  getMerchartsOffers(id:any){
    console.log(140, id);
    return this.http.get(apiUrl + `/getMerchartsOffers/` + id);
  }

  getOffersCatgy(id:any){
    return this.http.get(apiUrl + `/getOffersCatgy/` + id);

  }

  getOtpMobile(data:any) {
    console.log(150, data);
    return this.http.post(apiUrl + `/getdashotp`, data);
  }

  updatePassword(data:any){
    console.log(data);
    return this.http.post(apiUrl + `/updatePassword`, data)
  }

  // merchants store for travels
  getMerchantsTravels(){
    return this.http.get(apiUrl + `/getMerchantsTravels`);

  }

  /* merchants store for recharge*/
  getMerchantsRecharge(){
    return this.http.get(apiUrl + `/getMerchantsRecharge`);
  }
  /* getMerchantsFashion */
  getMerchantsFashion(){
    return this.http.get(apiUrl + `/getMerchantsFashion`);
  }

  getMerchantsFood(){
    return this.http.get(apiUrl + `/getMerchantsFood`);
  }

  getMerchantsOffsStrs(id:any){
    return this.http.get(apiUrl + `/getMerchantsOffsStrs/` + id);

  }

  getRangePercantage(data:any){
    return this.http.get(apiUrl + '/getRangePercantage' , data)
  }
}
