import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { ToasterService } from 'src/app/shared/toaster.service';


@Component({
  selector: 'app-highcashback-offer',
  templateUrl: './highcashback-offer.component.html',
  styleUrls: ['./highcashback-offer.component.css']
})
export class HighcashbackOfferComponent implements OnInit {

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
  topBrandList:any;
  topCatergyname:any;
  topStoreData: any;
  copycoupontext: any;
  modelData: any;
  modelDataId: any;
  term!:string
  loaderShow = true;

  constructor(private api: ApiKeyService, private activeRoute: ActivatedRoute, private toaster:ToasterService) {

    this.activeRoute.queryParams.subscribe((res: any) => {
      this.topStoreKey = res.highcashOfferKey;
      this.topCatergyname = res.highcashname;
      
    });

    this.api.getOfferData().subscribe((res: any) => {
      this.fashinDat = res.data;
      setTimeout(() => {
        this.loaderShow = false;
      }, 1000);
      this.fashionDataList = this.fashinDat.filter((res: any) => res.merchant_id  == this.topStoreKey);
      this.topBrandList = this.fashinDat.filter((res: any) => res.merchant_id == this.topStoreKey);
      console.log(36, this.fashionDataList);
    });
    

    this.getMerchantsIdStore();
  }


  ngOnInit(): void {
     this.getTopStores();
  }

  
  getTopStores() {
    this.api.getMerchantsData().subscribe((res:any) => {
      this.topStoreData = res.data;
      console.log(36, this.topStoreData);
   })
  }


  getDataItmeCatgry(){
    this.api.getOfferData().subscribe((res:any) => {
      this.fashionDataList = res.data;
      console.log(89, this.fashionDataList);
      
     })
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
      'storeId': this.selecteFashionStore,
      'subCategryId': '',
    }

    this.api.getOfferDataId(data).subscribe((res: any) => {
      this.fashionDataList = res.data;
      console.log(116, this.fashionDataList);

    })
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

  getBillStoresModel(id: any) {

  }

  Details(id: any) {

  }

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
      }
    }
  }


  getMerchantsIdStore(){
    this.api.getMerchantsIdStore(this.topStoreKey).subscribe((res:any) => {
         this.storeDataList = res.data;
         console.log(183, res.data);
    })
  }



}
