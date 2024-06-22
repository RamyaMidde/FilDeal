import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cateorires-new',
  templateUrl: './cateorires-new.component.html',
  styleUrls: ['./cateorires-new.component.css'],
})
export class CateoriresNewComponent implements OnInit {
  rechargetKeyId: any;
  fashinDat: any;
  fashionDataList: any;
  topBrandList: any;
  rechargetList: any = [];
  rechargetListres: any;
  rechargetListDat: any;
  selecteFashionStore: any = [];
  selecteFashionSubCagty: any = [];
  nameSubCatgry: any;
  storeDataList: any;
  subCategryList: any;
  rechargetName: any;
  modelData: any;
  modelDataId: any;
  copycoupontext: any;
  textToCopy: any;
  loaderShow = true;
  term!: string;
  fontsizeicon: string = 'medium';
  querparamsSubscribe:Subscription;
  rechargeDatListNew: any;

  constructor(private api: ApiKeyService, private activeRoute: ActivatedRoute) {
     this.querparamsSubscribe =  this.activeRoute.queryParams.subscribe((res: any) => {
      this.rechargetKeyId = res.Recharge_keyId;
      this.rechargetName = res.recharge_nm;
      console.log(18, this.rechargetKeyId);
    });
 
    this.api.getOffersCatgy(this.rechargetKeyId).subscribe((res:any) => {
       this.rechargeDatListNew = res.data;
       console.log(4446, this.rechargeDatListNew);
    })
    

    this.getRechargeCatgry();
  }

  ngOnInit(): void {
    this.getMerchantsIdStore();
    this.getCatgry();
  }


  ngOnDestroy(){
    if(this.querparamsSubscribe){
      this.querparamsSubscribe.unsubscribe();
    }
  }

  getRechargeCatgry() {
    this.loaderShow = true;
    this.api.getRechargeCatgry().subscribe((res: any) => {
      if (res.status == 200) {
        this.loaderShow = false;
        this.rechargetList = res.data;
      }
    });
  }

  getCatgry() {
    this.api.getCatergries().subscribe((res: any) => {
      this.rechargetListres = res.data;
      console.log(51, this.rechargetListres);

      this.subCategryList = this.rechargetListres.filter(
        (res: any) => res.parent_id == 2300
      );
      console.log(52, this.subCategryList);
    });
  }

  onChangeSubCatgy(id: any) {
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
    console.log(76, data);
    this.api.getOfferDataId(data).subscribe((res: any) => {
      if (res.status == 200) {
        this.rechargetList = res.data;
      }
      setTimeout(() => {
        this.loaderShow = false;
      }, 1000);
      console.log(116, this.rechargetList);
    });
  }

  onChangeStore(id: any) {
    console.log(108, id);
    setTimeout(() => {
      this.loaderShow = false;
    }, 1000);
    var index = this.selecteFashionStore.indexOf(id);
    if (index != -1) {
      this.selecteFashionStore.splice(index, 1);
    } else {
      this.selecteFashionStore.push(id);
    }

    console.log(119, this.selecteFashionStore);
    var data = {
      storeId: this.selecteFashionStore,
      subCategryId: this.selecteFashionSubCagty,
    };

    this.api.getOfferDataId(data).subscribe((res: any) => {
      setTimeout(() => {
        this.loaderShow = false;
        this.fashionDataList = res.data;
      }, 1000);
      console.log(116, this.fashionDataList);
    });
  }

  getMerchantsIdStore() {
    this.api.getMerchantsRecharge().subscribe((res: any) => {
      this.storeDataList = res.data;
      console.log(140, res.data);
    });
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
        alert('Coupon-Code copied: ' + this.copycoupontext);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
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
      },
    },
  };
}
