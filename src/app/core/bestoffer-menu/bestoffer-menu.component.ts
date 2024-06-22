import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiKeyService } from 'src/app/shared/api-key.service';



@Component({
  selector: 'app-bestoffer-menu',
  templateUrl: './bestoffer-menu.component.html',
  styleUrls: ['./bestoffer-menu.component.css']
})
export class BestofferMenuComponent implements OnInit {
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
  filterSearch! :string;
  

  constructor(private apiKey:ApiKeyService, private router:Router) { }

  ngOnInit(): void {
    this.getbestOffers();
  }


  
  getbestOffers() {
    this.apiKey.getbestOffers().subscribe((res: any) => {
      this.bestOfferList = res.data;
      this.mobileBestOfer = this.bestOfferList.filter((res: any) =>
        res.category_ids.split(',').includes('1000')
      );
    console.log(63, this.mobileBestOfer);

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
      console.log(54, this.computerBestOfer);
      
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

  getBestOfferKey(id:any, name:any):any {
    this.router.navigate(['/best-offers'], {
      queryParams: {
        bestOfferKey: id,
        merchant_name: name,
      },
    });
  }

}
