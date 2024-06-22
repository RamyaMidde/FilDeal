import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/shared/toaster.service';


@Component({
  selector: 'app-recharge-new-catgry',
  templateUrl: './recharge-new-catgry.component.html',
  styleUrls: ['./recharge-new-catgry.component.css']
})
export class RechargeNewCatgryComponent implements OnInit {
  rechargeId: any;
  recharge_name: any;
  subCategryList: any = [];
  subCatgryListDat: any;
  copycoupontext: any;
  modelData: any;
  modelDataId: any;
  loaderShow: boolean = true;
  term!: string;
  selecteFashionStore: any = [];
  selecteRechargeSubCagty: any[] = [];
  rechargetList: any = [];
  queyParamsSubscription$!: Subscription;
  destoryKeyIdSubscription$!: Subscription;
  rechargetCatgryList: any = [];
  termsearch: any;
  storeDataList: any = [];
  selecteFashionSubCagty: any = [];



  constructor(private api: ApiKeyService, private router: ActivatedRoute, private http: HttpClient, private toaster:ToasterService) {

    this.getqueryIds();
  }

  ngOnInit(): void {
    this.getMerchantsIdStore();
    this.getSubCatgry();
  }



  getqueryIds() {
    this.queyParamsSubscription$ = this.router.queryParams.subscribe((params: any) => {
      this.loaderShow = false;
      this.rechargeId = params['Recharge_keyId'];
      this.recharge_name = params['recharge_nm'];
      this.getSubCatgry();
      console.log(522, this.rechargeId);
      this.api.getOffersCatgy(this.rechargeId).subscribe((res: any) => {
        this.rechargetList = res.data;
        console.log(28, this.rechargetList);
        console.log(56, this.queyParamsSubscription$);
      })
    })
  }

  getSubCatgry() {
    this.api.getCatergries().subscribe((item: any) => {
      this.subCatgryListDat = item.data;
      this.subCategryList = this.subCatgryListDat.filter((res: any) => res.parent_id == 2300);
      this.destoryKeyIdSubscription$ = this.subCategryList.map((resf: any) => {
        resf.checked = (resf.id == this.rechargeId);
      })
    })
  }


  fashionDataLists: any;
  getDataItmeCatgry() {
    this.api.getOfferData().subscribe((res: any) => {
      this.fashionDataLists = res.data;
      this.rechargetList = this.fashionDataLists.map((res: any) => res.parent_id == 2300);
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
        this.rechargetList = res.data;
      }
      console.log(152, this.selecteRechargeSubCagty);
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
    var data = {
      storeId: this.selecteFashionStore,
      subCategryId: this.selecteRechargeSubCagty,
    };
    this.api.getOfferDataId(data).subscribe((res: any) => {
      this.rechargetList = res.data;
      console.log(116, this.rechargetList);
    });
  }



  getMerchantsIdStore() {
    this.api.getMerchantsRecharge().subscribe((res: any) => {
      this.storeDataList = res.data;
      console.log(140, this.storeDataList);
    });
  }



  ngOnDestroy() {
    if (this.queyParamsSubscription$) {
      this.queyParamsSubscription$.unsubscribe();
    }
    if (this.destoryKeyIdSubscription$) {
      this.destoryKeyIdSubscription$.unsubscribe();
    }
  }


  goToUrl(url: string) {
    window.open(url, "_blank");
  }

  copyurllink(id: any) {
    this.copycoupontext = id;
    navigator.clipboard
      .writeText(this.copycoupontext)
      .then(() => {
          this.toaster.showInfo('CoupenCode : ' + this.copycoupontext,'Copied');
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  }

  getFashionParams(id: any) {
    console.log(100, id);
    this.api.getOfferData().subscribe((res: any) => {
      this.modelData = res.data;
      this.modelDataId = this.modelData.filter(
        (res: any) => res.coupon_id == id
      );
    });
  }
}
