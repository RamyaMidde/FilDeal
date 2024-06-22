import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { ToasterService } from 'src/app/shared/toaster.service';




@Component({
  selector: 'app-top-stores',
  templateUrl: './top-stores.component.html',
  styleUrls: ['./top-stores.component.css']
})
export class TopStoresComponent implements OnInit {
  storeId: any;
  storeName: any;
  offerData: any;
  offerDataList: any;
  topStoreData: any;
  selectedMerctStore: any[] = [];
  searchterm: string = '';
  toStoredat: any;
  toStoredats: any;
  loaderShow = true;
  copycoupontext: any;

  constructor(private activeRoute: ActivatedRoute, private api: ApiKeyService,  private toaster:ToasterService) {

    this.activeRoute.queryParams.subscribe((res: any) => {
      this.storeId = res.store_KeyId;
      this.storeName = res.store_name;
      console.log(23, this.storeId);
    });

    this.api.getOfferData().subscribe((res: any) => {
      this.offerData = res.data;
      setTimeout(() => {
         this.loaderShow = false;
      }, 1000);
      this.offerDataList = this.offerData.filter((res: any) => res.merchant_id == this.storeId);
      console.log(28, this.offerDataList);
    })
  }

  ngOnInit() {
    this.getMerchants();
  }

  getMerchants() {
    this.api.getMerchantsData().subscribe((res: any) => {
      this.topStoreData = res.data;
      console.log(40, this.topStoreData);
    })
  }


  onChangeStoreCatgy(item: any) {
    console.log(50, item);

    var index = this.selectedMerctStore.indexOf(item);
    if (index != -1) {
      this.selectedMerctStore.splice(index, 1);
    } else {
      this.selectedMerctStore.push(item);
    }
    this.api.getOfferData().subscribe((res: any) => {
      this.offerData = res;
      this.offerDataList = this.offerData.filter((res: any) => res.merchant_id == this.selectedMerctStore);
      console.log(28, this.offerDataList);
    });

  }

  getTopStoresModel(id: any) {
    console.log(id);
    this.api.getOfferData().subscribe((res: any) => {
      this.toStoredat = res.data;
      this.toStoredats = this.toStoredat.filter((res: any) => res.coupon_id == id);
      console.log(106, this.toStoredats);
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
}
