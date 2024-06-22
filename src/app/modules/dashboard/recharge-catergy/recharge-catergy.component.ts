import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recharge-catergy',
  templateUrl: './recharge-catergy.component.html',
  styleUrls: ['./recharge-catergy.component.css']
})
export class RechargeCatergyComponent implements OnInit {
  rechargeId: any;
  recharge_name: any;
  rechargeList: any = [];
  queryParamsSubscription!: Subscription;
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
  rechargeIdDat: any;
  destoryKeyIdSubscription!: Subscription;
  noData_ind = 0;
  @ViewChild('listContainer') listContainer!: ElementRef<HTMLDivElement>;
  previousCheckedValue: string = '';
  currentCheckedValue: string = '';

  constructor(private api: ApiKeyService, private router: ActivatedRoute, private http: HttpClient) {
    this.queryParamsSubscription = this.router.queryParams.subscribe((params: any) => {
      this.rechargeId = params['Recharge_keyId'];
      this.recharge_name = params['recharge_nm'];
      this.rechargeIdDat = parseInt(this.rechargeId);
      this.getCatgry();
      this.api.getOffersCatgy(this.rechargeId).subscribe((res: any) => {
        console.log(47, res.data.length);
         if(res.data.length == 0){
          this.noData_ind = 1;
         }
        this.loaderShow = false;
        this.rechargetList = res.data;
        console.log(52, this.rechargetList);
        
      })
    });
  }

  ngOnInit(): void {
    this.getMerchantsIdStore();
    
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

  getCatgry() {
    this.api.getCatergries().subscribe((res: any) => {
      this.rechargetListres = res.data;
      this.subCategryList = this.rechargetListres.filter((res: any) => res.parent_id == 2300);
      /* Automatically check the subcategory from header click */
      this.destoryKeyIdSubscription = this.subCategryList.map((resf: any) => {
        resf.checked = (resf.id == this.rechargeIdDat);
        return resf;
      });
  
      this.destryunSubscribequeryPrm();
      console.log(52, this.subCategryList);
    });
  }


  destryunSubscribequeryPrm(){
    if (this.destoryKeyIdSubscription) {
      this.destoryKeyIdSubscription.unsubscribe();
    }
  }

 selectedRechartDat:any =[];
  onChangeSubCatgy(id: any) {
    console.log(84, id);
    var index = this.selecteFashionSubCagty.indexOf(id);
    if (index != -1) {
      this.selecteFashionSubCagty.splice(index, 1);
    } else {
      this.selecteFashionSubCagty.push(id);
    }
    console.log(132, this.selecteFashionSubCagty);
    var data = {
      storeId: this.selecteFashionStore,
      subCategryId: this.selecteFashionSubCagty,
    };
    console.log(76, data);
    this.api.getOfferDataId(data).subscribe((res: any) => {
      if (res.status == 200) {
    
        this.rechargetList = res.data;
        // this.selectedRechartDat.map((res:any) => res.category_ids == 2300);
        // this.rechargetList = this.selectedRechartDat;
        // console.log(150, this.selectedRechartDat);
        
      }
      console.log(116, this.rechargetList);
    console.log(152, this.selecteFashionSubCagty);

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
  }

  getMerchantsIdStore() {
    this.api.getMerchantsRecharge().subscribe((res: any) => {
      this.storeDataList = res.data;
      console.log(140, res.data);
    });
  }


  ngOnDestroy() {
    this.destryunSubscribequeryPrm();
   if (this.queryParamsSubscription) {
     this.queryParamsSubscription.unsubscribe();
   }
 }

}
