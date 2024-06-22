import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  CatryList: any;
  catgryData: any;
  catgryFood: any;
  catgryOtherCatgry: any;
  catgryFashion: any;
  catgryTravel: any;
  catgryOtherPopular: any;
  params = new HttpParams();
  registerForm!:FormGroup;
  submitted:boolean = false;
  loading = false;
  unamePattern = "^[a-z0-9_-]{8,15}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userLogin:any;
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
  topStoreData:any;
  storeDiscount:any;
  bestprodctOffers: any;
  offerListDat: any = [];
  elctroniOffers: any;
  
  constructor(private api: ApiService, private router: Router, private http: HttpClient, 
    private formBuilder: FormBuilder) {



      this.api.getMerchants().subscribe((res:any) => {
        this.topStoreData = res;
        console.log(36, this.topStoreData);
     })

      this.userLogin = localStorage.getItem('username');
      if(this.userLogin == null){
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
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required,  Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobile:['', [Validators.required,  Validators.minLength(11)]],
  });
  }

  getCatergyMenus(){
     this.api.getCaterMenus().subscribe((res:any) => {
         this.catgryDataList = res.data;
         console.log(89,this.catgryDataList);
         
        this.billRecharge = this.catgryDataList.filter((item:any) => item.parent_name == "Recharge and Bill Payment");
        this.catgryFood = this.catgryDataList.filter((item:any) => item.parent_name == "Food and Dining");
        this.catgryFashion = this.catgryDataList.filter((item:any) => item.parent_name == "Fashion and Accessories");
        this.catgryTravel = this.catgryDataList.filter((item:any) => item.parent_name == "Travels");
        this.catgryOtherCatgry = this.catgryDataList.filter((item:any) => item.parent_name == "Other");

     })
  }



  getCatryList() {
    this.api.getCatryList().subscribe((res: any) => {
      this.CatryList = res.data;
      // this.catgryData = this.CatryList.filter((res: any) => res.catergory_name === "Recharge");
      // this.catgryFood = this.CatryList.filter((res: any) => res.catergory_name === "Food & Dining");
      
      // this.catgryOtherCatgry = this.CatryList.filter((res: any) => res.catergory_name === "Other Categories");
      // this.catgryFashion = this.CatryList.filter((res: any) => res.catergory_name === "Fashion");
      // this.catgryTravel = this.CatryList.filter((res: any) => res.catergory_name === "Travel");
      // this.catgryOtherPopular = this.CatryList.filter((res: any) => res.catergory_name === "Other Popular");
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

  getTravels(id:any, item:any){
    console.log(47, id);
    this.router.navigate(['/travelsCatgories'], { queryParams: { 'travels_keyId': id } });
    
  }

  getOtherCatgry(id:any, item:any) {
    this.router.navigate(['/othercatergories'], { queryParams: { 'otherCagtry_keyId': id } });
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


  getTopStoreParId(id:any, name:any){
      this.router.navigate(['/topStores'], {
        queryParams : {
          'store_KeyId':id,
          'store_name':name
        }
      })
  }



  removeUser() {
    localStorage.removeItem('username');
    window.location.reload();
  }

  getTopStore(){
    this.api.getTopStore().subscribe((res:any) => {
       this.topStore = res.data;
      this.amzonstore = this.topStore.filter((res:any) => res.stores_nm === 'amazon');
      this.flipkartstore = this.topStore.filter((res:any) => res.stores_nm === 'FlipKart');
      this.myntrastore = this.topStore.filter((res:any) => res.stores_nm === 'Myntra');
    })
  }

  getBestOffers(){
    this.api.getBestOffers().subscribe((res:any) => {
       this.bestOffers = res.data;
       console.log(119, this.bestOffers);
    })
  }


  getCollectionSales(){
    this.api.getCollectionSales().subscribe((res:any) => {
       this.CollectionSales = res.data;
       this.megaSale =   this.CollectionSales.filter((res:any) => res.sales == 'Mega Sale');
       this.walletSale =   this.CollectionSales.filter((res:any) => res.sales == 'Wallet');
       this.bankSale =   this.CollectionSales.filter((res:any) => res.sales == 'Bank');
       this.festivalSale =   this.CollectionSales.filter((res:any) => res.sales == 'Festival');

    })
  }


  getBestOffer(){
     this.api.getOfferData().subscribe((res:any) => {
       this.bestprodctOffers = res.data;
       console.log(194, this.bestprodctOffers);
       this.offerListDat = this.bestprodctOffers.filter((item:any) => item.discount == "Best Offer");
       console.log(196, this.offerListDat);
       this.elctroniOffers = this.offerListDat.filter((res:any) => res.merchant_id == "cpd_1003");
     })
  }



}
