import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiKeyService } from 'src/app/shared/api-key.service';


@Component({
  selector: 'app-topstore-menu',
  templateUrl: './topstore-menu.component.html',
  styleUrls: ['./topstore-menu.component.css']
})
export class TopstoreMenuComponent implements OnInit {


  CatryList: any;
  catgryData: any;
  catgryFood: any;
  catgryOtherCatgry: any;
  catgryFashion: any;
  catgryTravel: any;
  catgryOtherPopular: any;
  params = new HttpParams();
  registerForm!: FormGroup;
  submitted: boolean = false;
  loading = false;
  unamePattern = "^[a-z0-9_-]{8,15}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userLogin: any;
  showLoginModal = false;
  topStore: any;
  amzonstore: any;
  myntrastore: any;
  flipkartstore: any;
  bestOffers: any;
  CollectionSales: any;
  megaSale: any;
  walletSale: any;
  festivalSale: any;
  bankSale: any;
  bestOferItme!: number;
  catgryDataList: any;
  billRecharge: any;
  topStoreData: any;
  storeDiscount: any;
  bestprodctOffers: any;
  offerListDat: any;
  filterSearch: string = '';

  constructor(private api: ApiKeyService, private router: Router, private http: HttpClient,
    private formBuilder: FormBuilder, private activeRoute: ActivatedRoute) {


    this.userLogin = localStorage.getItem('username');
    if (this.userLogin == null) {
      this.showLoginModal = true;
    } else {
      console.log(21, this.userLogin);
    }
  }


  ngOnInit(): void {
    this.getCatryList();
    this.getTopStore();
    this.getBestOffers();
    this.getCollectionSales();
    this.getCatergyMenus();
    this.getBestOffer();
    this.getTopStores();
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.minLength(11)]],
    });
  }

  getTopStores() {
    this.api.getMerchantsData().subscribe({
      next: (res: any) => {
        this.topStoreData = res.data;
      },
      error: (err: any) => {  
        console.log(err);
      }
    });
  }

  gettopStoresOffer(id: any, name: any) {
    this.router.navigate(['/topstorecatergories'],
      {
        queryParams: {
          'topCatergyKeyId': id,
          'topCatergyname': name
        }
      })
  }

  getCatergyMenus() {
    this.api.getCatergries().subscribe((res: any) => {
      this.catgryDataList = res.data;
      console.log(this.catgryDataList, 88);
      this.billRecharge = this.catgryDataList.filter((item: any) => item.parent_name == "Recharge and Bill Payment");
      this.catgryFood = this.catgryDataList.filter((item: any) => item.parent_name == "Food and Dining");
      this.catgryFashion = this.catgryDataList.filter((item: any) => item.parent_name == "Fashion and Accessories");
      this.catgryTravel = this.catgryDataList.filter((item: any) => item.parent_name == "Travels");
      this.catgryOtherCatgry = this.catgryDataList.filter((item: any) => item.parent_name == "Other");
    })
  }



  getCatryList() {
    this.api.getCatergries().subscribe((res: any) => {
      this.CatryList = res.data;
      this.catgryData = this.CatryList.filter((res: any) => res.catergory_name === "Recharge");
      this.catgryFood = this.CatryList.filter((res: any) => res.catergory_name === "Food & Dining");

      this.catgryOtherCatgry = this.CatryList.filter((res: any) => res.catergory_name === "Other Categories");
      this.catgryFashion = this.CatryList.filter((res: any) => res.catergory_name === "Fashion");
      this.catgryTravel = this.CatryList.filter((res: any) => res.catergory_name === "Travel");
      this.catgryOtherPopular = this.CatryList.filter((res: any) => res.catergory_name === "Other Popular");
    })
  }

  getRecharge(id: any, item: any) {
    this.router.navigate(['/categories'], {
      queryParams: {
        'Recharge_keyId': id,
        'recharge_nm': item
      }
    });
  }

  getFashion(id: any, item: any) {
    console.log(46, id);
    this.router.navigate(['/fashionCatgories'], { queryParams: { 'Fashion_keyId': id } });
  }

  getTravels(id: any, item: any) {
    console.log(47, id);
    this.router.navigate(['/travelsCatgories'], { queryParams: { 'travels_keyId': id } });

  }

  getFood(id: any, item: any) {
    console.log(51, id);
    this.router.navigate(['/foodCatgories'], {
      queryParams:
      {
        'Food_keyId': id = 2,
        'food_catyName': item
      }
    });

  }


  getTopStoreParId(id: any, name: any) {
    this.router.navigate(['/topStores'], {
      queryParams: {
        'store_KeyId': id,
        'store_name': name
      }
    })
  }



  removeUser() {
    localStorage.removeItem('username');
    window.location.reload();
  }

  getTopStore() {
    this.api.getToBrands().subscribe((res: any) => {
      this.topStore = res.data;
      this.amzonstore = this.topStore.filter((res: any) => res.stores_nm === 'amazon');
      this.flipkartstore = this.topStore.filter((res: any) => res.stores_nm === 'FlipKart');
      this.myntrastore = this.topStore.filter((res: any) => res.stores_nm === 'Myntra');
    })
  }

  getBestOffers() {
    this.api.getOfferData().subscribe((res: any) => {
      this.bestOffers = res.data;
      console.log(119, this.bestOffers);
    })
  }


  getCollectionSales() {
    this.api.getCatergries().subscribe((res: any) => {
      this.CollectionSales = res.data;
      this.megaSale = this.CollectionSales.filter((res: any) => res.sales == 'Mega Sale');
      this.walletSale = this.CollectionSales.filter((res: any) => res.sales == 'Wallet');
      this.bankSale = this.CollectionSales.filter((res: any) => res.sales == 'Bank');
      this.festivalSale = this.CollectionSales.filter((res: any) => res.sales == 'Festival');

    })
  }


  getBestOffer() {
    this.api.getOfferData().subscribe((res: any) => {
      this.bestprodctOffers = res;
      this.offerListDat = this.bestprodctOffers.filter((res: any) => res.discount == 'Best Offer' && res.category_ids.some((res: any) => res == '1000'))
      console.log(194, this.offerListDat);
    })
  }

  getAllCatgry() {
    this.router.navigate(['/categorie-menu']);
  }



}
