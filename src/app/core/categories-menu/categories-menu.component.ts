import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiKeyService } from 'src/app/shared/api-key.service';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenuComponent implements OnInit {

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
  electronicList: any;
  fashionList: any;
  travelOfferList: any;
  HealthOfferList: any;
  loginForm: any;
  loginDat: any;
  loaderShow = true;

  constructor(private api: ApiService, private router: Router, private http: HttpClient,
    private formBuilder: FormBuilder, private apiKey: ApiKeyService) {

    this.apiKey.getMerchantsData().subscribe((res: any) => {
      this.topStoreData = res.data;
      setTimeout(() => {
         this.loaderShow = false;
      }, 1000);
      console.log(36, this.topStoreData);
    })

    this.userLogin = localStorage.getItem('username');
    if (this.userLogin == null) {
      this.showLoginModal = true;
    } else {
      console.log(21, this.userLogin);
    }
  }


  ngOnInit(): void {
    // this.getCatryList();
    this.getTopStore();
    this.getBestOffers();
    this.getCollectionSales();
    this.getCatergyMenus();
    this.getBestOffer();
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      pwd: ['', Validators.required],
      mobile: ['', Validators.required],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    })
  }

  getCatergyMenus() {
    this.apiKey.getCatergries().subscribe((res: any) => {
      this.catgryDataList = res.data;
      console.log(this.catgryDataList, 88);
      this.billRecharge = this.catgryDataList.filter((item: any) => item.parent_name == "Recharge and Bill Payment");
      this.catgryFood = this.catgryDataList.filter((item: any) => item.parent_name == "Food and Dining");
      this.catgryFashion = this.catgryDataList.filter((item: any) => item.parent_name == "Fashion and Accessories");
      this.catgryTravel = this.catgryDataList.filter((item: any) => item.parent_name == "Travels");
      this.catgryOtherCatgry = this.catgryDataList.filter((item: any) => item.parent_name == "Other");

    })
  }





  getRecharge(id: any, item: any) {
    this.router.navigate(['/CateoriresNew'], {
      queryParams: {
        'Recharge_keyId': id,
        'recharge_nm': item
      }
    });
  }

  getFashion(id: any, item: any) {
    this.router.navigate(['/fashionCatgories'], { queryParams: { 'Fashion_keyId': id } });
  }

  getTravels(id: any, item: any) {
    this.router.navigate(['/travelsCatgories'], { queryParams: { 'travels_keyId': id } });
  }

  getFood(id: any, item: any) {
    console.log(51, id);
    this.router.navigate(['/foodCatgories'], {
      queryParams:
      {
        'Food_keyId': id,
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


  getOtherCatgry(id: any, name: any) {
    console.log(153, id, name);
    this.router.navigate(['/othercatergories'], { queryParams: { 'otherCatgry_keyId': id } });
  }

  removeUser() {
    localStorage.removeItem('username');
    window.location.reload();
  }

  getTopStore() {
    this.apiKey.getToBrands().subscribe((res: any) => {
      this.topStore = res.data;
      this.amzonstore = this.topStore.filter((res: any) => res.stores_nm === 'amazon');
      this.flipkartstore = this.topStore.filter((res: any) => res.stores_nm === 'FlipKart');
      this.myntrastore = this.topStore.filter((res: any) => res.stores_nm === 'Myntra');
    })
  }

  getBestOffers() {
    this.api.getBestOffers().subscribe((res: any) => {
      this.bestOffers = res.data;
      console.log(119, this.bestOffers);
    })
  }


  getCollectionSales() {
    this.apiKey.getOfferData().subscribe((res: any) => {
      this.CollectionSales = res.data;
      console.log(174, this.CollectionSales);
      this.megaSale = this.CollectionSales.filter((res: any) => res.discount == 'Best Offer');
      this.walletSale = this.CollectionSales.filter((res: any) => res.sales == 'Wallet');
      this.bankSale = this.CollectionSales.filter((res: any) => res.sales == 'Bank');
      //  this.festivalSale =   this.CollectionSales.filter((res:any) => res.title  == 'Up to 70%');
      //  console.log(179, this.festivalSale);

    })
  }


  getBestOffer() {
    this.apiKey.getOfferData().subscribe((res: any) => {
      this.bestprodctOffers = res.data;
      //  this.offerListDat = this.bestprodctOffers.filter((res:any) => res.discount == 'Best Offer' && res.category_ids.some((res:any) => res == '1000'));
      this.offerListDat = this.bestprodctOffers.filter((res: any) => res.discount == 'Best Offer');
      this.electronicList = this.bestprodctOffers.filter((res: any) => res.category_ids == "1000");
      this.fashionList = this.bestprodctOffers.filter((res: any) => res.category_ids == "1100");
      this.travelOfferList = this.bestprodctOffers.filter((res: any) => res.category_ids == "2000");
      this.HealthOfferList = this.bestprodctOffers.filter((res: any) => res.category_ids == "1900");
      this.festivalSale = this.bestprodctOffers.filter((res: any) => res.title == "Up to 70%");

      console.log(191, this.festivalSale);

    })
  }

  getAllCatgry() {
    this.router.navigate(['/categorie-menu']);
  }

  getTopStores() {
    this.router.navigate(['/top-store']);
  }

  onSubmit() {
    console.log(211, this.registerForm.value);
    this.apiKey.addCustmrRegistr(this.registerForm.value).subscribe((res: any) => {
      if (res.status == 300) {
        alert('The email-Id is already Exists')
      } else if (res.status == 500) {
        alert('server error')
      } else {
        alert("Customer Register Sucessfully..!");
        this.registerForm.reset();

      }
    })
  }

  loginOnSubmit() {
    this.loginDat = this.loginForm.value;
    this.apiKey.getLogin(this.loginForm.value).subscribe((res: any) => {
      console.log(234, res);
      if (res.data.length == 1) {
        localStorage.setItem('username', res.data[0].name)
        alert('login Succesfully...!');
        this.loginForm.reset();
        window.location.reload();
      }
      else if (res.status == "300") {
        alert('Your Login Creditials Wrong Please login..!')
      }
    })

  }

  logOut() {
    localStorage.removeItem('username');
    window.location.reload();
  }

}
