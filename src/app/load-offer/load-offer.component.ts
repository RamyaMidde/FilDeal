import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
ApiService


@Component({
  selector: 'app-load-offer',
  templateUrl: './load-offer.component.html',
  styleUrls: ['./load-offer.component.css']
})
export class LoadOfferComponent implements OnInit {
  offerDatakey: any;
  dataList: any;
  listData: any;

  constructor(private activeRoute: ActivatedRoute, private apiService: ApiService) {
    // this.activeRoute.queryParams.subscribe((res: any) => {
    //   this.offerDatakey = res.offer_key;
    //   console.log(16, this.offerDatakey);
    //   this.apiService.getOfferData().subscribe((res: any) => {
    //     this.dataList = res;
    //     this.listData = this.dataList.filter((res: any) => res.coupon_id == this.offerDatakey);
    //     console.log(24, this.listData);
    //   });
    // })
  }

  ngOnInit(): void {
  }

}
