import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ApiKeyService } from 'src/app/shared/api-key.service';

import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-other-catergories',
  templateUrl: './other-catergories.component.html',
  styleUrls: ['./other-catergories.component.css']
})
export class OtherCatergoriesComponent implements OnInit {

  listFashion: any = [];
  fashionData: any = [];
  merchantData: any = [];
  banknewarray: any;
  fashionSubCatgry: any;
  merchtsStrore: any;
  fashionMerchtsData: any;
  selecteFashionSubCagty: any[] = [];
  fashionDataList: any = [];
  dataFashionlList: any;
  fashionStoreData: any;
  fashionStoreList: any;
  fashionPushStore: any;
  fshIdData: any;
  fashiondat: any;
  userinput: any;
  fashinDat: any;
  textToCopy: any;
  otherCatgry_keyId: any;
  nameSubCatgry: any;
  selecteFashionStore: any[] = [];
  storeDataList: any;
  topBrandList: any;
  loaderShow = true;
  subCategryList: any;
  copycoupontext: any;
  modelDataId: any;
  modelData: any;
  otherCatgryName: any;
  term!: string;
  termsearch: any;
  queyParamsSubscription!: Subscription;
  destoryKeyIdSubscription!: Subscription;
  subCatgryListDat: any;
  otherCatgryList: any = [];
  selecteRechargeSubCagty: any[] = [];


constructor(private api: ApiKeyService, private activeRoute: ActivatedRoute, private toaster:ToasterService) {

    this.getqueryIds();

  }

  ngOnInit(): void {
    this.getMerchantsIdStore();
  }


  getqueryIds() {
    this.queyParamsSubscription = this.activeRoute.queryParams.subscribe((params: any) => {
      this.loaderShow = false;
      this.otherCatgry_keyId = params['otherCatgry_keyId'];
      this.otherCatgryName = params['food_catyName'];
      this.getSubCatgry();
      this.api.getOffersCatgy(this.otherCatgry_keyId).subscribe((res: any) => {
        this.otherCatgryList = res.data;
        console.log(28, this.otherCatgryList);
      })
    })
  }


  getSubCatgry() {
    this.api.getCatergries().subscribe((item: any) => {
      this.subCatgryListDat = item.data;
      this.subCategryList = this.subCatgryListDat.filter((res: any) => res.parent_id == 3000);
      this.destoryKeyIdSubscription = this.subCategryList.map((resf: any) => {
        resf.checked = (resf.id == this.otherCatgry_keyId);
        return resf;
      })
    })
  }



  ngOnDestroy() {
    if (this.queyParamsSubscription) {
      this.queyParamsSubscription.unsubscribe();
    }
    if (this.destoryKeyIdSubscription) {
      this.destoryKeyIdSubscription.unsubscribe();
    }
  }

  getDataItmeCatgry() {
    this.api.getOfferData().subscribe((res: any) => {
      this.fashionDataList = res.data;
      setTimeout(() => {
        this.loaderShow = false;
      }, 1000);
    });
  }




  onChangeSubCatgy(x: any) {
    x.checked = !x.checked;
    if (x.checked) {
      this.selecteRechargeSubCagty.push(x.id);
    } else {
      const index = this.selecteRechargeSubCagty.indexOf(x.id);
      if (index !== -1) {
        this.selecteRechargeSubCagty.splice(index, 1);
      }
    }
    console.log(132, this.selecteRechargeSubCagty);
    var data = {
      storeId: this.selecteFashionStore,
      subCategryId: this.selecteRechargeSubCagty,
    };
    this.api.getOfferDataId(data).subscribe((res: any) => {
      if (res.status == 200) {
        this.otherCatgryList = res.data;
      }
      console.log(152, this.selecteRechargeSubCagty);
    });
  }


  onChangeStore(id: any) {
    console.log(108, id);

    var index = this.selecteFashionStore.indexOf(id);
    if (index != -1) {
      this.selecteFashionStore.splice(index, 1);
    } else {
      this.selecteFashionStore.push(id);
    }
    // this.fashionPushStore.push(this.fashionDataList);

    console.log(119, this.selecteFashionStore);
    var data = {
      storeId: this.selecteFashionStore,
      subCategryId: this.selecteFashionSubCagty,
    };

    this.api.getOfferDataId(data).subscribe((res: any) => {
      this.fashionDataList = res.data;
      console.log(116, this.fashionDataList);
    });
  }

  getFashionParams(id: any) {
    console.log(100, id);
    this.api.getOfferData().subscribe((res: any) => {
      this.modelData = res.data;
      this.modelDataId = this.modelData.filter(
        (res: any) => res.coupon_id == id
      );
      console.log(106, this.fshIdData);
    });
  }

  goToUrl(url: string) {
    console.log(138, url);
    window.open(url, "_blank");
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

  getBillStoresModel(id: any) { }

  Details(id: any) { }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };



  getMerchantsIdStore() {
    this.api.getMerchantsIdStore(this.otherCatgry_keyId).subscribe((res: any) => {
      this.storeDataList = res.data;
      console.log(183, res.data);
    });
  }

}
