import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { ApiKeyService } from 'src/app/shared/api-key.service';


@Component({
  selector: 'app-categry-coupon-page',
  templateUrl: './categry-coupon-page.component.html',
  styleUrls: ['./categry-coupon-page.component.css']
})
export class CategryCouponPageComponent implements OnInit {
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
  rechargetKeyId: any;
  nameSubCatgry: any;
  selecteFashionStore: any[] = [];
  storeDataList: any;
  topBrandList:any;
  constructor(private api: ApiKeyService, private activeRoute: ActivatedRoute) {

    this.activeRoute.queryParams.subscribe((res: any) => {
      this.rechargetKeyId = res.Recharge_keyId
    });

    this.api.getOfferData().subscribe((res: any) => {
      this.fashinDat = res.data;
      this.fashionDataList = this.fashinDat.filter((res: any) => res.category_names == 'Recharge and Bill Payment');
      this.topBrandList = this.fashinDat.filter((res: any) => res.category_names == 'Recharge and Bill Payment');
      console.log(36, this.fashionDataList);
    });

    this.getMerchantsIdStore();
  }


  ngOnInit(): void {
    this.getCatgry();
    // this.getTravelMerchts();

  }


  getDataItmeCatgry(){
    this.api.getOfferData().subscribe((res:any) => {
      this.fashionDataList = res.data;
      console.log(89, this.fashionDataList);
      
     })
  }

  /* Fashion */
  getCatgry() {
    this.api.getCatergries().subscribe((res: any) => {
      this.listFashion = res.data;
      this.fashionSubCatgry = this.listFashion.filter((res: any) => res.parent_name == "Recharge and Bill Payment");
      console.log(68, this.fashionSubCatgry);

    });
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
      'storeId': this.selecteFashionStore,
      'subCategryId': this.selecteFashionSubCagty
    }
    this.api.getOfferDataId(data).subscribe((res: any) => {
      this.fashionDataList = res.data;
      console.log(116, this.fashionDataList);
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

    console.log(119, this.selecteFashionStore);
    var data = {
      'storeId': this.selecteFashionStore,
      'subCategryId': this.selecteFashionSubCagty
    }

    this.api.getOfferDataId(data).subscribe((res: any) => {
      this.fashionDataList = res.data;
      console.log(116, this.fashionDataList);

    })
  }

  getFashionParams(id: any) {
    console.log(100, id);
    this.api.getOfferData().subscribe((res: any) => {
      this.fashiondat = res.data;
      this.fshIdData = this.fashiondat.filter((res: any) => res.coupon_id == id);
      console.log(106, this.fshIdData);
    });
  }



  copyurllink() {

    var copyText = document.getElementById("myInput") as HTMLInputElement;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Copied...!");
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
    this.api.getMerchantsIdStore(this.rechargetKeyId).subscribe((res:any) => {
         this.storeDataList = res.data;
         console.log(183, res.data);
    })
  }
}


