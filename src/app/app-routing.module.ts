import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoupenPageComponent } from './modules/coupen-page/coupen-page.component';
import { SignupComponent } from './core/signup/signup.component';
import { LoginComponent } from './core/login/login.component';
import { ShareEarnComponent } from './modules/share-earn/share-earn.component';
import { TopStoresComponent } from './modules/top-stores/top-stores.component';
import { BestOffersComponent } from './modules/best-offers/best-offers.component';
import { CategoriesMenuComponent } from './core/categories-menu/categories-menu.component';
import { LoadOfferComponent } from './load-offer/load-offer.component';
import { TopstoreMenuComponent } from './core/topstore-menu/topstore-menu.component';
import { BestofferMenuComponent } from './core/bestoffer-menu/bestoffer-menu.component';
import { CollectionComponent } from './modules/collection/collection.component';
import { TermsConditionComponent } from './core/terms-condition/terms-condition.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HeaderNewComponent } from './core/header-new/header-new.component';
import { CollectionMenuComponent } from './modules/collection-menu/collection-menu.component';





const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'coupon', component: CoupenPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'share&Earn', component: ShareEarnComponent },
  { path: 'topStores', component: TopStoresComponent },
  { path: 'best-offers', component: BestOffersComponent },
  { path: 'categorie-menu', component: CategoriesMenuComponent },
  { path: 'load-offer', component: LoadOfferComponent },
  { path: 'top-store', component: TopstoreMenuComponent },
  { path: 'bestoffer-menu', component: BestofferMenuComponent },
  { path: 'collections-sales', component: CollectionComponent },
  { path: 'terms-conditions', component: TermsConditionComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'header', component: HeaderNewComponent },
  { path: 'collection-menu', component: CollectionMenuComponent },






  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
