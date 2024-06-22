import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  bannerImgList: any;
  OfferList: any;
  owlCarousel: any;
  storesList: any;
  showItems: any;
  $: any;
  activeTab: boolean = false;
  activeTabFalse:boolean = false;
  verticalTabs: boolean = false;
  bankList: any;
  faqList: any;
  getcategoryList: any;
  showForm:boolean = false;
  bankNamList: any;
  bankOfferList: any;
  walletOfferList: any;
  listbank: any=[];
  catergyMenuList: any;
  CatryList: any;
  datCat: any;
  coupons: any;
  catergylist: any;
  merchantList: any;
  RechareBillDat: any;
  RechareBillDatList: any;
  exclusiveImgList: any;
  highCashbacklist: any;
  topStoreList: any;
  subscribeForm!  : FormGroup;
  submitted : boolean = false;
  constructor(private api:ApiService, private router:Router, private apiKey:ApiKeyService, private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.getBanners();
    this.getOffers();
    this.getCategryMenu();
    this.getCatryList();
    this.getOfferDataApi();
    this.getCategries();
    this.getMerchantsData();
    this.getExcluseive();
    this.getHighCashback();
    this.gettopStoreDashbard();

    this.subscribeForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
   });
     
  }

  getBanners() {
    this.apiKey.getBannersImg().subscribe((res: any) => {
      this.bannerImgList = res.data;
      
    })
  }


  getExcluseive() {
    this.apiKey.getExclusiveImg().subscribe((res: any) => {
      this.exclusiveImgList = res.data;
      
    })
  }

  getOffers() {
    this.apiKey.getOfferData().subscribe((res: any) => {
      this.OfferList = res.data;
    })
  }

  getCategries() {
    this.api.getCategries().subscribe((res: any) => {
      this.catergylist = res.data;
    })
  }

  getCategryMenu(){
    this.apiKey.getCatergries().subscribe((res:any) => {
      this.catergyMenuList = res.data;
    })
  }

  getCatryList(){
    this.apiKey.getCatergries().subscribe((res:any) => {
      this.CatryList = res.data;
       this.datCat = this.CatryList.filter((res:any) => res.catergory_name === "Recharge");
    })
  }


  getOfferDataApi(){
    this.api.getCoupons().subscribe((res:any) => {
    })
  }

  getMerchantsData(){
    this.apiKey.getMerchantsData().subscribe((res:any) => {
      this.merchantList = res.data;
      
    })
  }

  getHighCashback() {
    this.apiKey.getHighCashback().subscribe((res:any) => {
       this.highCashbacklist = res.data;
    })
  }

  getTopStores() {
    this.router.navigate(['/top-store']);
  }

  gettopStoreDashbard() {
    this.apiKey.gettopStoreDashbard().subscribe((res:any) => {
      this.topStoreList = res.data;
      
   })
  }

  getBillStoresModel(id: any) {
    console.log(id);
    this.apiKey.getOfferData().subscribe((res: any) => {
      this.RechareBillDat = res.data;
      this.RechareBillDatList = this.RechareBillDat.filter((res: any) => res.coupon_id == id);
    });
  }

  getHishCashBack() {
    this.router.navigate(['/high-cashbackstores']);
  }

  get f() {
    return this.subscribeForm.controls;
  }

  addCustmrSubscribe() {
    this.submitted = true;
    if (this.subscribeForm.invalid) {
      return;
    }
      var data = this.subscribeForm.value;
      this.apiKey.addCustmrSubscribe(data).subscribe((res:any) => {
         if(res.status == '300'){
           alert('customer already subscribed...!');
           this.subscribeForm.reset();
         } else if(res.status == '200') {
          alert('customer subscribed sucessfully...!');
          this.submitted = false;
          this.subscribeForm.reset();
         }
      })
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-left" aria-hidden="true"></i>',
      '<i class="fa fa-arrow-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 2
      }
    },
    nav: true
  }




  customOptionCard: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    slideBy: 'page',
    navSpeed: 700,
    margin: 3,
    navText: ['<i class="fa fa-arrow-left" aria-hidden="true"></i>',
      '<i class="fa fa-arrow-right" aria-hidden="true"></i>'],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 5
        }
      },
      nav: true
  }



  customOptionsOffer: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    margin: 10,
    navSpeed: 300,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };


  customOptionsCdOffer: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 10,
    navSpeed: 300,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  };


  }
