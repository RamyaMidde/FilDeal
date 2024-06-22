import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CategryCouponPageComponent } from './categry-coupon-page/categry-coupon-page.component';
import { FoodCatgryCouponComponent } from './food-catgry-coupon/food-catgry-coupon.component';
import { FashionCatgryComponent } from './fashion-catgry/fashion-catgry.component';
import { TravelsComponent } from './travels/travels.component';
import { HighCashbackStoresComponent } from './high-cashback-stores/high-cashback-stores.component';
import { OtherCatergoriesComponent } from './other-catergories/other-catergories.component';
import { TopStoreCategoriesComponent } from './top-store-categories/top-store-categories.component';
import { HighcashbackOfferComponent } from './highcashback-offer/highcashback-offer.component';
import { CateoriresNewComponent } from './cateorires-new/cateorires-new.component';
import { MerchantsOffersComponent } from './merchants-offers/merchants-offers.component';
import { RechargeCatergyComponent } from './recharge-catergy/recharge-catergy.component';
import { RechargeNewCatgryComponent } from './recharge-new-catgry/recharge-new-catgry.component';



const routes: Routes = [

  { path: '', component: DashboardComponent},
  { path: 'categories', component: CategryCouponPageComponent},
  { path: 'foodCatgories', component: FoodCatgryCouponComponent},
  { path: 'fashionCatgories', component: FashionCatgryComponent},
  { path: 'travelsCatgories', component: TravelsComponent},
  { path: 'high-cashbackstores', component: HighCashbackStoresComponent},
  { path: 'othercatergories', component: OtherCatergoriesComponent},
  { path: 'topstorecatergories', component: TopStoreCategoriesComponent},
  { path: 'highcashback-offers', component: HighcashbackOfferComponent},
  { path: 'CateoriresNew', component: CateoriresNewComponent},
  { path: 'merchants-offers', component: MerchantsOffersComponent},
  { path: 'recharge-catgrys', component: RechargeCatergyComponent},
  { path: 'recharge-catgry', component: RechargeNewCatgryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
