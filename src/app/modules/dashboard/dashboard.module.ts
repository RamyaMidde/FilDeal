import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategryCouponPageComponent } from './categry-coupon-page/categry-coupon-page.component';
import { FoodCatgryCouponComponent } from './food-catgry-coupon/food-catgry-coupon.component';
import { FashionCatgryComponent } from './fashion-catgry/fashion-catgry.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TravelsComponent } from './travels/travels.component';
import { HighCashbackStoresComponent } from './high-cashback-stores/high-cashback-stores.component';
import { RouterModule } from '@angular/router';
import { LimitPipe } from 'src/app/customPipe/limit.pipe';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { OtherCatergoriesComponent } from './other-catergories/other-catergories.component';
import { TopStoreCategoriesComponent } from './top-store-categories/top-store-categories.component';
import { HighcashbackOfferComponent } from './highcashback-offer/highcashback-offer.component';
import { CateoriresNewComponent } from './cateorires-new/cateorires-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NameLengthPipe } from 'src/app/customPipe/name-length.pipe';
import { MerchantsOffersComponent } from './merchants-offers/merchants-offers.component';
import { RechargeCatergyComponent } from './recharge-catergy/recharge-catergy.component';
import { RechargeNewCatgryComponent } from './recharge-new-catgry/recharge-new-catgry.component';




@NgModule({
  declarations: [
    DashboardComponent,
    CategryCouponPageComponent,
    FoodCatgryCouponComponent,
    FashionCatgryComponent,
    TravelsComponent,
    HighCashbackStoresComponent,
    LimitPipe,
    OtherCatergoriesComponent,
    TopStoreCategoriesComponent,
    HighcashbackOfferComponent,
    CateoriresNewComponent,
    NameLengthPipe,
    MerchantsOffersComponent,
    RechargeCatergyComponent,
    RechargeNewCatgryComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CarouselModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule,
    ReactiveFormsModule,

  ],
  
  providers: [{ provide: LocationStrategy,  useClass: PathLocationStrategy }],
  bootstrap: []
})
export class DashboardModule { }
