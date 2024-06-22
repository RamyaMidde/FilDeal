import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { ToasterService } from 'src/app/shared/toaster.service';



@Component({
  selector: 'app-food-catgry-coupon',
  templateUrl: './food-catgry-coupon.component.html',
  styleUrls: ['./food-catgry-coupon.component.css']
})
export class FoodCatgryCouponComponent implements OnInit {

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
  foodKeyId: any;
  nameSubCatgry: any;
  selecteFashionStore: any[] = [];
  storeDataList: any;
  topBrandList: any;
  loaderShow = true;
  subCategryList: any;
  copycoupontext: any;
  modelDataId: any;
  modelData: any;
  foodKeyName: any;
  term!: string;
  queryParamsSubscription!: Subscription
  destoryKeyIdSubscription!: Subscription
  fashionKeyDat: any;
  noData_ind = 0;
  termsearch: any;

  constructor(private api: ApiKeyService, private activeRoute: ActivatedRoute, private toaster: ToasterService) {
    this.getParamsData();
  }

  ngOnInit(): void {
    this.getMerchantsIdStore();
    this.getCatgry()
  }



  getParamsData() {
    this.queryParamsSubscription = this.activeRoute.queryParams.subscribe((params: any) => {
      this.foodKeyId = params['Food_keyId'];
      this.foodKeyName = params['food_catyName'];
      this.getCatgry();
      this.loaderShow = false;
      this.api.getOffersCatgy(this.foodKeyId).subscribe((res: any) => {
        this.fashionDataList = res.data;
        console.log(28, this.fashionDataList);
      })
    });

  }


  getDataItmeCatgry() {
    this.api.getOfferData().subscribe((res: any) => {
      this.fashionDataList = res.data;
      setTimeout(() => {
        this.loaderShow = false;
      }, 1000);
    });
  }

  /* Fashion */
  getCatgry() {
    this.destoryKeyIdSubscription = this.api.getCatergries().subscribe((res: any) => {
      this.listFashion = res.data;
      this.destoryKeyIdSubscription = this.subCategryList = this.listFashion.filter(
        (res: any) => res.parent_id == 1500);
      this.subCategryList.map((resf: any) => {
        resf.checked = (resf.id == this.foodKeyId);
        return resf;
      })
    });
  }



  ngOnDestroy() {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
    if (this.destoryKeyIdSubscription) {
      this.destoryKeyIdSubscription.unsubscribe();
    }
  }


  // getTravelMerchts() {
  //   this.api.getMerchantsData().subscribe((res: any) => {
  //     this.merchtsStrore = res.data;
  //     this.fashionMerchtsData = this.merchtsStrore.filter((item: any) => item.category_ids == '1100')
  //   })
  // }

  onChangeSubCatgy(id: any) {
    this.nameSubCatgry = id;
    console.log(84, id);
    var index = this.selecteFashionSubCagty.indexOf(id);
    if (index != -1) {
      this.selecteFashionSubCagty.splice(index, 1);
    } else {
      this.selecteFashionSubCagty.push(id);
    }

    var data = {
      storeId: this.selecteFashionStore,
      subCategryId: this.selecteFashionSubCagty,
    };

    this.api.getOfferDataId(data).subscribe((res: any) => {
      this.fashionDataList = res.data;
      console.log(116, this.fashionDataList);
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
        this.toaster.showInfo('CoupenCode : ' + this.copycoupontext, 'Copied');
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  }


  getMerchantsIdStore() {
    this.api.getMerchantsFood().subscribe((res: any) => {
      this.storeDataList = res.data;
      console.log(183, res.data);
    });
  }

}
