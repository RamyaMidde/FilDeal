import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiKeyService } from 'src/app/shared/api-key.service';



@Component({
  selector: 'app-collection-menu',
  templateUrl: './collection-menu.component.html',
  styleUrls: ['./collection-menu.component.css']
})
export class CollectionMenuComponent implements OnInit {
  megaSale: any = [];
  walletSale: any = [];
  festivalSale: any = [];
  bankSale: any = [];
  wallet: any = [];
  saleslist: any = [];
  festivallist: any = [];
  speciallist: any = [];
  promotionlist: any = [];
  filterSearch!:string

  constructor(private apiKey:ApiKeyService, private router:Router) { }

  ngOnInit() {
    this.getfestival();
    this.getspecial();
    this.getspecial();
    this.getpromations();
    this.getbanks();
    this.getWallet();
    this.getsales();
    this.bankSale();
  
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

  getBestOfferKey(id:any , name:any):any {
    this.router.navigate(['/collections-sales'], {
      queryParams: {
        collectionKeyId: id,
        collectionname: name,
      },
    });
     
  }


}
