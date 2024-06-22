import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { ToasterService } from 'src/app/shared/toaster.service';


@Component({
  selector: 'app-fashion-catgry',
  templateUrl: './fashion-catgry.component.html',
  styleUrls: ['./fashion-catgry.component.css'],
})
export class FashionCatgryComponent implements OnInit {
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
  fashionKeyId: any;
  nameSubCatgry: any;
  selecteFashionStore: any[] = [];
  storeDataList: any;
  topBrandList: any;
  loaderShow = true;
  subCategryList: any;
  copycoupontext: any;
  modelDataId: any;
  modelData: any;
  fashionKeyName: any;
  term!: string;
  noData_ind = 0;
  termsearch: any;
  queyParamsSubscription!: Subscription;
  destoryKeyIdSubscription!: Subscription;



  constructor(private api: ApiKeyService, private activeRoute: ActivatedRoute,private toaster:ToasterService) {
    this.getParamsData();
  }

  ngOnInit() {
    this.getMerchantsIdStore();
    this.getCatgry();
  }


  getParamsData() {
    this.queyParamsSubscription = this.activeRoute.queryParams.subscribe((params: any) => {
      this.fashionKeyId = params['Fashion_keyId'];
      this.fashionKeyName = params['fashionName'];
      this.getCatgry();
      this.loaderShow = false;
      this.api.getOffersCatgy(this.fashionKeyId).subscribe((res: any) => {
        this.fashionDataList = res.data;
        console.log(28, this.fashionDataList);
      })
    });

  }


  fashionDataLists: any;
  getDataItmeCatgry() {
    this.api.getOfferData().subscribe((res: any) => {
      this.fashionDataLists = res.data;
      this.fashionDataList = this.fashionDataLists.map((res: any) => res.parent_id == 1100)
    });
  }

  /* Fashion */
  getCatgry() {
    this.destoryKeyIdSubscription = this.api.getCatergries().subscribe((res: any) => {
      this.listFashion = res.data;
         this.subCategryList = this.listFashion.filter(
        (res: any) => res.parent_id == 1100);
      this.subCategryList.map((resf: any) => resf.checked = (resf.id == this.fashionKeyId))
      console.log(68, this.subCategryList);
    });
  }

  ngOnDestroy() {
    if (this.queyParamsSubscription) {
      this.queyParamsSubscription.unsubscribe();
    }
    if (this.destoryKeyIdSubscription) {
      this.destoryKeyIdSubscription.unsubscribe();
    }
  }


  onChangeSubCatgy(x: any) {
    x.checked = !x.checked;
    if (x.checked) {
      this.selecteFashionSubCagty.push(x.id);
    } else {
      const index = this.selecteFashionSubCagty.indexOf(x.id);
      if (index !== -1) {
        this.selecteFashionSubCagty.splice(index, 1);
      }
    }
    console.log(132, this.selecteFashionSubCagty);
    var data = {
      storeId: this.selecteFashionStore,
      subCategryId: this.selecteFashionSubCagty,
    };
    this.api.getOfferDataId(data).subscribe((res: any) => {
      if (res.status == 200) {
        this.fashionDataList = res.data;
      }
      console.log(152, this.selecteFashionSubCagty);
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

  getMerchantsIdStore() {
    this.api.getMerchantsFashion().subscribe((res: any) => {
      this.storeDataList = res.data;
      console.log(183, res.data);
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
}
