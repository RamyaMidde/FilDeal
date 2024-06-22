import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

import { Router } from '@angular/router';
import { ApiKeyService } from 'src/app/shared/api-key.service';

@Component({
  selector: 'app-high-cashback-stores',
  templateUrl: './high-cashback-stores.component.html',
  styleUrls: ['./high-cashback-stores.component.css']
})
export class HighCashbackStoresComponent implements OnInit {
  merchantList: any;
  filterSearch!: string;

  constructor(private api:ApiService, private router:Router, private apiKey:ApiKeyService) {
  }

  ngOnInit(): void {
    this.getMerchantsData();
  }


  getMerchantsData(){
    this.apiKey.getHighCashback().subscribe((res:any) => {
      this.merchantList = res.data;
      console.log(26, this.merchantList);
    })
  }

  gettopStoresOffer(id:any, name:any){
    console.log(32, id);
    
    this.router.navigate(['/highcashback-offers'], {
      queryParams : 
             {
              'highcashOfferKey': id,
              'highcashname': name
             }
    } );

  }

}
