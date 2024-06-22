import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { ToasterService } from 'src/app/shared/toaster.service';



@Component({
  selector: 'app-merchants-offers',
  templateUrl: './merchants-offers.component.html',
  styleUrls: ['./merchants-offers.component.css']
})
export class MerchantsOffersComponent implements OnInit {
  merchantKeyId: any;
  merchantKeyName: any;
  queryParamsSubscription!: Subscription;
  merchantsOfferdata: any = [];
  modelData: any;
  modelDataId: any;
  copycoupontext: any;
  term!: string
  loaderShow = true;
  noData_ind = 0;
  termsDat: string[] = [];
 


  constructor(private activeRoute: ActivatedRoute, private api: ApiKeyService, private toaster:ToasterService) {
    this.queryParamsSubscription = this.activeRoute.queryParams.subscribe((params: any) => {
      this.merchantKeyId = params['merchantsKeyId'];
      this.merchantKeyName = params['merchantsName'];

      this.api.getMerchartsOffers(this.merchantKeyId).subscribe((res: any) => {
         setTimeout(() => {
          this.loaderShow = false;
          if(res.data == 0){
             this.noData_ind = 1
          }
          this.merchantsOfferdata = res.data;
          console.log(38, this.merchantsOfferdata);
         }, 500);
      })
    });
  }

  ngOnInit(): void {
  }




  getFashionParams(id: any) {
    console.log(100, id);
    this.api.getOfferData().subscribe((res: any) => {
      this.modelData = res.data;
      this.modelDataId = this.modelData.filter(
        (res: any) => res.coupon_id == id
      );
      console.log(106, this.modelDataId);
    });
  }


  copyurllink(id: any) {
    console.log(123, id);
    this.copycoupontext = id;
    console.log(126, this.copycoupontext);
    navigator.clipboard
      .writeText(this.copycoupontext)
      .then(() => {
        this.toaster.showInfo('CoupenCode : ' + this.copycoupontext,'Copied');
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  }

  ngOnDestroy() {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

}
