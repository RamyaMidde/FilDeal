import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { ToasterService } from 'src/app/shared/toaster.service';



@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})
export class TravelsComponent implements OnInit {

  listFashion: any = [];
  fashionData: any = [];
  merchantData: any = [];
  banknewarray: any;
  fashionSubCatgry: any;
  merchtsStrore: any;
  fashionMerchtsData: any;
  selecteFashionSubCagty: any[] = [];
  travelsDataList: any = [];
  dataFashionlList: any;
  fashionStoreData: any;
  fashionStoreList: any;
  fashionPushStore: any;
  fshIdData: any;
  fashiondat: any;
  userinput: any;
  fashinDat: any;
  textToCopy: any;
  travelKeyId: any;
  nameSubCatgry: any;
  selecteTravelStore: any[] = [];
  storeDataList: any = [];
  topBrandList: any;
  loaderShow = true;
  subCategryList: any;
  copycoupontext: any;
  modelDataId: any;
  modelData: any;
  travelkeyName: any;
  term!: string;
  termsearch: any;
  queyParamsSubscription!: Subscription;
  destoryKeyIdSubscription!: Subscription;
  subCatgryListDat: any;
  selecteTravelsSubCagty: any[] = [];


  constructor(private api: ApiKeyService, private activeRoute: ActivatedRoute, private toaster:ToasterService) {
    this.getqueryIds();
  }

  ngOnInit() {
    this.getMerchantsIdStore();
    this.getSubCatgry();
  }


  getqueryIds() {
    this.queyParamsSubscription = this.activeRoute.queryParams.subscribe((params: any) => {
      this.loaderShow = false;
      this.travelKeyId = params['travels_keyId'];
      this.travelkeyName = params['travelkeyName'];
      this.getSubCatgry();
      this.api.getOffersCatgy(this.travelKeyId).subscribe((res: any) => {
        this.travelsDataList = res.data;
        console.log(28, this.travelsDataList);
      })
    })
  }

  getSubCatgry() {
    this.api.getCatergries().subscribe((item: any) => {
      this.subCatgryListDat = item.data;
    this.subCategryList = this.subCatgryListDat.filter((res: any) => res.parent_id == 2000);
    this.destoryKeyIdSubscription =   this.subCategryList.map((resf: any) => {
        resf.checked = (resf.id == this.travelKeyId);
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

  fashionDataLists: any;
  getDataItmeCatgry() {
    this.api.getOfferData().subscribe((res: any) => {
      this.fashionDataLists = res.data;
      this.travelsDataList = this.fashionDataLists.map((res: any) => res.parent_id == 2000)
    });
  }

  getMerchantsIdStore() {
    this.api.getMerchantsTravels().subscribe((res: any) => {
      this.storeDataList = res.data;
      console.log(183, res.data);
    });
  }


  onChangeSubCatgy(x: any) {
    x.checked = !x.checked;
    if (x.checked) {
      this.selecteTravelsSubCagty.push(x.id);
    } else {
      const index = this.selecteTravelsSubCagty.indexOf(x.id);
      if (index !== -1) {
        this.selecteTravelsSubCagty.splice(index, 1);
      }
    }
    console.log(132, this.selecteTravelsSubCagty);
    var data = {
      storeId: this.selecteTravelStore,
      subCategryId: this.selecteTravelsSubCagty,
    };
    this.api.getOfferDataId(data).subscribe((res: any) => {
      if (res.status == 200) {
        this.travelsDataList = res.data;
      }
      console.log(152, this.selecteTravelsSubCagty);
    });
  }


  onChangeStore(id: any) {
    var index = this.selecteTravelStore.indexOf(id);
    if (index != -1) {
      this.selecteTravelStore.splice(index, 1);
    } else {
      this.selecteTravelStore.push(id);
    }

    console.log(119, this.selecteTravelStore);
    var data = {
      storeId: this.selecteTravelStore,
      subCategryId: this.selecteTravelsSubCagty,
    };

    this.api.getOfferDataId(data).subscribe((res: any) => {
      this.travelsDataList = res.data;
      console.log(116, this.travelsDataList);
    });
  }

  /* model popup */
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
        this.toaster.showInfo('CoupenCode : ' + this.copycoupontext,'Copied');
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  }






}

