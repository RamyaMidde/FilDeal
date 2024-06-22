import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ApiKeyService } from 'src/app/shared/api-key.service';

@Component({
  selector: 'app-top-store-categories',
  templateUrl: './top-store-categories.component.html',
  styleUrls: ['./top-store-categories.component.css']
})
export class TopStoreCategoriesComponent implements OnInit {

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
  termsearch:any;


  

  constructor(private api: ApiKeyService, private activeRoute: ActivatedRoute) {
    this.getParamsIds();
    

  }


  ngOnInit(): void {
    this.getTopStores();
  }
  

  getParamsIds() {
    this.destroyParamsId$ =  this.activeRoute.queryParams.subscribe((params: any) => {
      this.topStoreKey = params['topCatergyKeyId'];
      this.topCatergyname = params['topCatergyname'];
      this.loaderShow = false;
       this.api.getMerchantsOffsStrs(this.topStoreKey).subscribe((res: any) => {
        this.fashionDataList = res.data;
        console.log(28, this.fashionDataList);
        this.destroyParamsId$ =  this.fashionDataList.map((resf:any) => {
           resf.checked = (resf.id = this.topStoreKey)
        })
      })
    });
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
        alert('Coupon-Code copied: ' + this.copycoupontext);
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
