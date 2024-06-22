import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { ToasterService } from 'src/app/shared/toaster.service';



@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

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
  topStoreKey: any;
  nameSubCatgry: any;
  selecteFashionStore: any[] = [];
  storeDataList: any;
  topBrandList: any;
  topCatergyname: any;
  topStoreData: any;
  loaderShow = true;
  copycoupontext: any;
  modelData: any;
  modelDataId: any;
  term!: string
  destroyParamsId$!: Subscription;
  fashionDataLists: any;
  termsearch: any;
  minValue: number = 0;
  maxValue: number = 100;





  constructor(private api: ApiKeyService, private activeRoute: ActivatedRoute, private toaster: ToasterService) {
    this.destroyParamsId$ = this.activeRoute.queryParams.subscribe((params: any) => {
      this.topStoreKey = params['collectionKeyId'];
      this.topCatergyname = params['collectionname'];
      this.loaderShow = false;
      this.api.getMerchantsOffsStrs(this.topStoreKey).subscribe((res: any) => {
        this.fashionDataList = res.data;
        console.log(28, this.fashionDataList);
        this.destroyParamsId$ = this.fashionDataList.map((resf: any) => {
          resf.checked = (resf.id = this.topStoreKey)
        });
        this.fashionDataList.filter((item: any) => {
          item.discount >= this.minValue && item.discount <= this.maxValue
        });
      })
    });
  }


  ngOnInit(): void {
    this.getTopStores();
  }

  getParamsIds() {

  }


  getChangeRange(max: any, min: any) {
    console.log('Key pressed:', min, ' :', max);
  }

  getTopStores() {
    this.api.getMerchantsData().subscribe((res: any) => {
      this.topStoreData = res.data;
      console.log(36, this.topStoreData);
    })
  }


  getDataItmeCatgry() {
    this.api.getOfferData().subscribe((res: any) => {
      this.fashionDataList = res.data;
      console.log(89, this.fashionDataList);

    })
  }

  onChangeSubCatgy(x: any) {
    console.log(108, x.id);
    x.checked = !x.checked;
    if (x.checked) {
      this.selecteFashionStore.push(x.id);
    } else {
      const index = this.selecteFashionStore.indexOf(x.id);
      if (index !== -1) {
        this.selecteFashionStore.splice(index, 1);
      }
    }

    console.log(119, this.selecteFashionStore);
    var data = {
      'storeId': this.selecteFashionStore,
      'subCategryId': '',
    }

    this.api.getOfferDataId(data).subscribe((res: any) => {
      this.fashionDataList = res.data;
      console.log(116, this.fashionDataList);

    })
  }

  // getFashionParams(id: any) {
  //   console.log(100, id);
  //   this.api.getOfferData().subscribe((res: any) => {
  //     this.fashiondat = res.data;
  //     this.fshIdData = this.fashiondat.filter((res: any) => res.coupon_id == id);
  //     console.log(106, this.fshIdData);
  //   });
  // }

  getFashionParams(id: any) {
    console.log(100, id);
    this.api.getOfferData().subscribe((res: any) => {
      this.modelData = res.data;
      this.modelDataId = this.modelData.filter(
        (resf: any) => resf.slno == id);
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
        this.toaster.showInfo('CoupenCode : ' + this.copycoupontext, 'Copied');
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  }

  getMerchantsIdStore() {
    this.api.getMerchantsIdStore(this.topStoreKey).subscribe((res: any) => {
      this.loaderShow = false;
      this.storeDataList = res.data;
      console.log(183, res.data);
    })
  }

  ngOnDestroy() {
    if (this.destroyParamsId$) {
      this.destroyParamsId$.unsubscribe();
    }
  }
}
