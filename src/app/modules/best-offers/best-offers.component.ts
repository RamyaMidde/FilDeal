import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { ToasterService } from 'src/app/shared/toaster.service';


@Component({
  selector: 'app-best-offers',
  templateUrl: './best-offers.component.html',
  styleUrls: ['./best-offers.component.css']
})
export class BestOffersComponent implements OnInit {
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
  topBrandList:any;
  bestKeyId:any;
  bestOfferName:any;
  offerDatalist: any;
  loaderShow = true;
 term:string = '';
  copycoupontext: any;
  fontsizeicon:string = 'medium';
  modelDataId: any;
  modelData: any;
  termsearch:any;
  destroyParamsId$!: Subscription;

  
  constructor(private api: ApiKeyService, private activeRoute: ActivatedRoute, private toaster:ToasterService) {

    this.getParamsIds();

  }


  ngOnInit(): void {
    this.getCatgry();
  }

  getParamsIds() {
    this.destroyParamsId$ =  this.activeRoute.queryParams.subscribe((params: any) => {
      this.bestKeyId = params['bestOfferKey'];
      this.bestOfferName = params['merchant_name'];
      this.loaderShow = false;
       this.api.getMerchantsOffsStrs(this.bestKeyId).subscribe((res: any) => {
        this.fashionDataList = res.data;
        console.log(28, this.fashionDataList);
        this.destroyParamsId$ =  this.fashionDataList.map((resf:any) => {
           resf.checked = (resf.id = this.bestKeyId)
        })
      })
    });
  }


  getDataItmeCatgry(){
    this.api.getbestOffers().subscribe((res:any) => {
      this.fashionDataList = res.data;
      console.log(89, this.fashionDataList);

     })
  }

  /* Fashion */
  getCatgry() {
    this.api.getbestOffers().subscribe((res: any) => {
       this.fashionSubCatgry = res.data;
      console.log(68, this.fashionSubCatgry);

    });

  }

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
      'subCategryId': this.selecteFashionSubCagty
    }
    console.log(96, data);
    this.api.getbestOfferListId(data).subscribe((res: any) => {
      this.fashionDataList = res.data;
      console.log(116, this.fashionDataList);
    })

  }



  // getFashionParams(id: any) {
  //   console.log(100, id);
  //   this.api.getbestOffers().subscribe((res: any) => {
  //     this.fashiondat = res.data;
  //     this.fshIdData = this.fashiondat.filter((res: any) => res.merchant_id == id);
  //     console.log(106, this.fshIdData);
  //   });
  // }

  getFashionParams(id: any) {
    console.log(100, id);
    this.api.getOfferData().subscribe((res: any) => {
      this.modelData = res.data;
      this.modelDataId = this.modelData.filter(
        (res: any) => res.slno == id
      );
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




}
