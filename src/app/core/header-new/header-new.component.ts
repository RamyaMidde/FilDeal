import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiKeyService } from 'src/app/shared/api-key.service';
import { CateoriresNewComponent } from 'src/app/modules/dashboard/cateorires-new/cateorires-new.component';
import { MustMatch } from 'src/app/confirm-password.validator';
import { ToasterService } from 'src/app/shared/toaster.service';




@Component({
  selector: 'app-header-new',
  templateUrl: './header-new.component.html',
  styleUrls: ['./header-new.component.css'],
})
export class HeaderNewComponent implements OnInit {
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
  unamePattern = '^[a-z0-9_-]{8,15}$';
  pwdPattern = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).{6,12}$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
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
  bestOfferList: any;
  mobileBestOfer: any;
  fashionBestOfer: any;
  beautyBestOfer: any;
  foodBestOfer: any;
  computerBestOfer: any = [];
  gamingBestOfer: any;
  movieBestOfer: any;
  flowersBestOfer: any;
  furetinerBestOfer: any;
  paymentcard: any;
  bank: any;
  wallet: any;
  shopingSale: any;
  saleslist: any;
  speciallist: any;
  festivallist: any;
  promotionlist: any;
  registerSubmited: boolean = false;
  term: string = '';
  showLoginPageCondtion: boolean = true;
  loaderShow = true;
  forgotModelShow = 0;
  forgotForm!: FormGroup;
  submittedForgot: boolean = false;
  verfitShow: boolean = true;
  loginOtpForm!: FormGroup;
  passwordGenterForm!: FormGroup
  otpDat: any = [];
  otp1: any;
  otpNum: any;
  verfyCnfrmShow: boolean = false;
  confirmSubmit: boolean = false;
  updateOtpEmail: any;
  

  @ViewChild('dismissibleElement') dismissibleElement: any;
  otpShow: any;
  otp: any = {}; // Object to hold OTP digits
  forgotpModel: boolean = false;
  updateOtpId: any;
  passwordCnfrmShow: boolean = false;
  showPassword: boolean = false;
  showPasswordOnPress: boolean = false;

  constructor(
    private api: ApiService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private apiKey: ApiKeyService,
    public catee: CateoriresNewComponent,
    public toaster: ToasterService
  ) {
    this.apiKey.getMerchantsData().subscribe((res: any) => {
      this.topStoreData = res.data;
      console.log(114, this.topStoreData);

    });

    this.userLogin = localStorage.getItem('username');
    if (this.userLogin == null) {
      this.showLoginModal = true;
      if (this.showLoginModal == true) {
        this.forgotModelShow = 1
      }
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    // this.getCatryList();
    this.getTopStore();
    this.getBestOffers();
    this.getCollectionSales();
    this.getCatergyMenus();
    this.getBestOffer();
    this.getbestOffers();
    this.getWallet();
    this.getbanks();
    this.getsales();
    this.getspecial();
    this.getpromations();
    this.getfestival();
    this.getTopStoresHead();
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      pwd: ['', [Validators.required, Validators.minLength(4)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });

    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      pwd: ['', Validators.required],
    });




    this.forgotForm = this.formBuilder.group({
      mobileForgtOtp: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });

    this.loginOtpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });

    this.passwordGenterForm = this.formBuilder.group({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    },
      {
        validators: MustMatch('password', 'confirmPassword')
      })

  }


  forgotShow() {
    const model = document.getElementById('exampleModal');
    const forgotModal = document.getElementById('exampleModalCenter');
    if (model) {
      model.style.display = 'none';
    }
  }


  get pwdff() {
    return this.passwordGenterForm.controls;
  }

  /*  forgot password  */
  forgotSubmitOtp() {
    this.submittedForgot = true;
    if (this.forgotForm.invalid) {
      this.toaster.showError('Required Field', '')
      return;
    } else {
      this.verfitShow = false;
      this.apiKey.getOtpMobile(this.forgotForm.value).subscribe((res: any) => {
        this.loaderShow = true;
        if (res.status == 300) {
          this.toaster.showError('Invalid mobileNumber', '')
          this.loaderShow = true;
          this.verfitShow = true;
        } else if (res.status == 200) {
           this.toaster.showSuccess('otp generated', 'please check mobile text');
          this.forgotpModel = true;
          const model = document.getElementById('forgotpModelExample');
          if (model) {
            model.style.display = 'block'
          }
          this.otpShow = res.data[1];
          this.updateOtpId = this.otpShow[0].id;
          this.updateOtpEmail = this.otpShow[0].email;
        }
      });


    }

  }


  otplogin() {
    this.otpDat.push(this.otp.digit1, this.otp.digit2, this.otp.digit3, this.otp.digit4);
    this.otpNum = parseInt(this.otpDat.join(''), 10);
    if (this.loginOtpForm.invalid) {
      this.toaster.showError('Required Field', '')
      return;
    } else if (this.otpShow[0].otp == this.otpNum) {
      this.toaster.showSuccess('login otp sucessfully..!', '')

      this.forgotpModel = false;
      this.passwordCnfrmShow = true;
    }
  }

  signupFormForgt() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.style.display = 'block';
    }
    document.getElementById('close-dismisForgt')?.click();
  }


  getCatergyMenus() {
    this.apiKey.getCatergries().subscribe((res: any) => {
      this.catgryDataList = res.data;
      this.billRecharge = this.catgryDataList.filter(
        (item: any) => item.parent_name == 'Recharge and Bill Payment'
      );

      this.catgryFood = this.catgryDataList.filter(
        (item: any) => item.parent_name == 'Food and Dining'
      );
      this.catgryFashion = this.catgryDataList.filter(
        (item: any) => item.parent_name == 'Fashion and Accessories'
      );
      this.catgryTravel = this.catgryDataList.filter(
        (item: any) => item.parent_name == 'Travels'
      );
      this.catgryOtherCatgry = this.catgryDataList.filter(
        (item: any) => item.parent_name == 'Other'
      );
    });
  }

  getbanks() {
    this.apiKey.getBanks().subscribe((res: any) => {
      this.bankSale = res.data;
    });
  }

  getWallet() {
    this.apiKey.getwallet().subscribe((res: any) => {
      this.wallet = res.data;
    });
  }

  getsales() {
    this.apiKey.getsales().subscribe((res: any) => {
      this.saleslist = res.data;
    });
  }

  getfestival() {
    this.apiKey.getfestival().subscribe((res: any) => {
      this.festivallist = res.data;
    });
  }

  getspecial() {
    this.apiKey.getspical().subscribe((res: any) => {
      this.speciallist = res.data;
    });
  }

  getpromations() {
    this.apiKey.getpromotion().subscribe((res: any) => {
      this.promotionlist = res.data;
    });
  }

  // getRecharge(id: any, item: any) {
  //   this.router.navigate(['/CateoriresNew'], {
  //     queryParams: {
  //       Recharge_keyId: id,
  //       recharge_nm: item,
  //     },
  //   });
  //   window.scrollTo(0, 0);
  //   this.catee.getRechargeCatgry();
  // }

  /* update checking */
  getRecharge(id: any, name: any) {
    console.log(224, id);
    this.router.navigate(['/recharge-catgry'], {
      queryParams: {
        Recharge_keyId: id,
        recharge_nm: name,
      }
    });
    window.scrollTo(0, 0);
  }

  getFood(id: any, item: any) {
    console.log(51, id);
    this.router.navigate(['/foodCatgories'], {
      queryParams: {
        Food_keyId: id,
        food_catyName: item,
      },
    });
    window.scrollTo(0, 0);
  }

  getFashion(id: any, name: any) {
    this.router.navigate(['/fashionCatgories'], {
      queryParams: { Fashion_keyId: id, fashionName: name },
    });
    window.scrollTo(0, 0);
  }

  getTravels(id: any, item: any) {
    this.router.navigate(['/travelsCatgories'], {
      queryParams: { travels_keyId: id, travelkeyName: item },
    });
    window.scrollTo(0, 0);
  }



  getTopStoreParId(id: any, name: any) {
    this.router.navigate(['/topStores'], {
      queryParams: {
        store_KeyId: id,
        store_name: name,
      },
    });
    window.scrollTo(0, 0);
  }

  onSubmitTopStore() {
    this.router.navigate(['/top-store']);

    document.getElementById('close-dismis')?.click();
    window.scrollTo(0, 0);
  }

  onSubmitBestOffer() {
    this.router.navigate(['/bestoffer-menu']);
    document.getElementById('close-dismis')?.click();
    window.scrollTo(0, 0);
  }

  disclose() {
    this.router.navigate(['/index.html']);
    document.getElementById('close-dismis')?.click();
    window.scrollTo(0, 0);
  }

  getOtherCatgry(id: any, name: any) {
    console.log(153, id, name);
    this.router.navigate(['/othercatergories'], {
      queryParams: {
        otherCatgry_keyId: id,
        otherCatgryName: name
      },
    });
    window.scrollTo(0, 0);
  }

  gettopstorecatergories(id: any, name: any) {
    this.router.navigate(['/topstorecatergories'], {
      queryParams: {
        topCatergyKeyId: id,
        topCatergyname: name,
      },
    });
  }

  gettopStoresOffer(id: any, name: any) {
    this.router.navigate(['/topstorecatergories'], {
      queryParams: {
        topCatergyKeyId: id,
        topCatergyname: name,
      },
    });
  }

  getMechtsTopStore(id: any, name: any) {
    this.loaderShow = true;
    setTimeout(() => {
      this.router.navigate(['/merchants-offers'], {
        queryParams: {
          merchantsKeyId: id,
          merchantsName: name
        }
      }).then(() => {
        this.loaderShow = false;
      });
    }, 2000);
  }

  getBestOfferKey(id: any, name: any) {
    this.router.navigate(['/best-offers'], {
      queryParams: {
        bestOfferKey: id,
        merchant_name: name,
      },
    });
  }

  getCollection(id: any, name: any) {
    this.router.navigate(['/collections-sales'], {
      queryParams: {
        collectionKeyId: id,
        collectionname: name,
      },
    });
  }

  onInputChange(event: any) {
    event.target.value = event.target.value.replace(/\s/g, '');
  }

  getbestOffers() {
    this.apiKey.getbestOffers().subscribe((res: any) => {
      this.bestOfferList = res.data;
      this.mobileBestOfer = this.bestOfferList.filter((res: any) =>
        res.category_ids.split(',').includes('1000')
      );
      this.fashionBestOfer = this.bestOfferList.filter((res: any) =>
        res.category_ids.split(',').includes('1100')
      );
      this.beautyBestOfer = this.bestOfferList.filter((res: any) =>
        res.category_ids.split(',').includes('1700')
      );
      this.foodBestOfer = this.bestOfferList.filter((res: any) =>
        res.category_ids.split(',').includes('1500')
      );
      this.computerBestOfer = this.bestOfferList.filter((res: any) =>
        res.category_ids.split(',').includes('2400')
      );
      this.gamingBestOfer = this.bestOfferList.filter((res: any) =>
        res.category_ids.split(',').includes('2700')
      );
      this.movieBestOfer = this.bestOfferList.filter((res: any) =>
        res.category_ids.split(',').includes('2500')
      );
      this.flowersBestOfer = this.bestOfferList.filter((res: any) =>
        res.category_ids.split(',').includes('1300')
      );
      this.furetinerBestOfer = this.bestOfferList.filter((res: any) =>
        res.category_ids.split(',').includes('1800')
      );
    });
  }

  viewBestOffers() {
    this.router.navigate(['/bestoffer-menu']);
  }

  removeUser() {
    localStorage.removeItem('username');
    window.location.reload();
  }

  getTopStore() {
    this.apiKey.getToBrands().subscribe((res: any) => {
      this.topStore = res.data;
      this.amzonstore = this.topStore.filter(
        (res: any) => res.stores_nm === 'amazon'
      );
      this.flipkartstore = this.topStore.filter(
        (res: any) => res.stores_nm === 'FlipKart'
      );
      this.myntrastore = this.topStore.filter(
        (res: any) => res.stores_nm === 'Myntra'
      );
    });
  }

  getBestOffers() {
    this.api.getBestOffers().subscribe((res: any) => {
      this.bestOffers = res.data;
      console.log(119, this.bestOffers);
    });
  }

  getCollectionSales() {
    this.apiKey.getOfferData().subscribe((res: any) => {
      this.CollectionSales = res.data;
      this.megaSale = this.CollectionSales.filter(
        (res: any) => res.discount == 'Best Offer'
      );
      this.walletSale = this.CollectionSales.filter(
        (res: any) => res.sales == 'Wallet'
      );
      this.bankSale = this.CollectionSales.filter(
        (res: any) => res.sales == 'Bank'
      );
      //  this.festivalSale =   this.CollectionSales.filter((res:any) => res.title  == 'Up to 70%');
      //  console.log(179, this.festivalSale);
    });
  }

  getBestOffer() {
    this.apiKey.getOfferData().subscribe((res: any) => {
      this.bestprodctOffers = res.data;
      //  this.offerListDat = this.bestprodctOffers.filter((res:any) => res.discount == 'Best Offer' && res.category_ids.some((res:any) => res == '1000'));
      this.offerListDat = this.bestprodctOffers.filter(
        (res: any) => res.discount == 'Best Offer'
      );
      this.electronicList = this.bestprodctOffers.filter(
        (res: any) => res.category_ids == '1000'
      );
      this.fashionList = this.bestprodctOffers.filter(
        (res: any) => res.category_ids == '1100'
      );
      this.travelOfferList = this.bestprodctOffers.filter(
        (res: any) => res.category_ids == '2000'
      );
      this.HealthOfferList = this.bestprodctOffers.filter(
        (res: any) => res.category_ids == '1900'
      );
      this.festivalSale = this.bestprodctOffers.filter(
        (res: any) => res.title == 'Up to 70%'
      );

      console.log(191, this.festivalSale);
    });
  }

  getAllCatgry() {
    this.router.navigate(['/categorie-menu']);
    document.getElementById('close-dismis')?.click();
    window.scrollTo(0, 0);
  }

  getTopStores() {
    this.router.navigate(['/top-store']);
    document.getElementById('close-dismis')?.click();
    window.scrollTo(0, 0);

  }

  collectionOffers() {
    this.router.navigate(['/collection-menu']);
    document.getElementById('close-dismis')?.click();
    window.scrollTo(0, 0);

  }

  get ff() {
    return this.registerForm.controls;
  }

  get forgotF() {
    return this.forgotForm.controls;
  }

  onSubmit() {
    this.registerSubmited = true;
    if (this.registerForm.invalid) {
      this.toaster.showError('Required Fields', '')
      return;
    } else {
      this.apiKey
        .addCustmrRegistr(this.registerForm.value)
        .subscribe((res: any) => {
          if (res.status == 200) {
            this.toaster.showSuccess('Customer Register Sucessfully..!', '')
            this.registerForm.reset();
            this.registerSubmited = false;
            document.getElementById('login-tab')?.click();
          } else if (res.status == 300) {
            this.toaster.showError('The email-Id is already Exists, please login', '')
            this.registerSubmited = false;
          } else if (res.status == 500) {
            this.toaster.showError('server error', '')

          }
        });
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  loginOnSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.toaster.showError("Required Fields", "");
      return;
    } else {
      this.loginDat = this.loginForm.value;
      this.apiKey.getLogin(this.loginForm.value).subscribe((res: any) => {
        if (res.data.length == 1) {
          localStorage.setItem('username', res.data[0].name);
          this.submitted = false;
          this.showLoginModal = false;
          this.toaster.showSuccess('login Succesfully', '')
         setTimeout(() => {
          this.loginForm.reset();
          window.location.reload();
         }, 2000);
        } else if (res.status == '300') {
          this.toaster.showError('Your Login Creditials Wrong Please login Again..!', '')
        }
      });
    }
  }

  logOut() {
    this.toaster.showSuccess("Thanking You..!", "");
    localStorage.removeItem('username');
    setTimeout(() => {
    window.location.reload();
    }, 2000);
  }


  getTopStoresHead() {
    this.api.getMerchantsData().subscribe((res: any) => {
      this.topStoreData = res.data;
      console.log(36, this.topStoreData);
    })
  }

  dismissAlert() {
    this.dismissibleElement.nativeElement.classList.remove('show');
  }

  moveToNext(event: KeyboardEvent, nextInputIndex: number | null) {
    const target = event.target as HTMLInputElement;
    const length = target.value.length;
    if (length === 1 && nextInputIndex !== null) {
      const nextInput = document.getElementsByName('digit' + nextInputIndex)[0] as HTMLInputElement;
      nextInput.focus();
    }
  }

  handleMouseLeave(){

  }

  submitPassword() {
    this.confirmSubmit = true;
    if (this.passwordGenterForm.invalid) {
      this.toaster.showError("Required Fields", "");
      return;
    }

    var data = {
      'id': this.updateOtpId,
      'pwd': this.passwordGenterForm.value.password
    }

    this.apiKey.updatePassword(data).subscribe((res: any) => {
      if (res.status == 200) {
        this.passwordCnfrmShow = false;
        this.toaster.showSuccess('Password Updated Sucessfully..!', '')
        const exampleModal = document.getElementById('exampleModal');
        if (exampleModal) {
          exampleModal.style.display = 'block';
        }
        this.loginForm.patchValue({ email: this.updateOtpEmail });
      }

    });
    this.loginForm.patchValue({ email: this.updateOtpEmail });
    console.log(674, this.passwordGenterForm.value);
  }
}
