import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoupenPageComponent } from './modules/coupen-page/coupen-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './core/signup/signup.component';
import { LoginComponent } from './core/login/login.component';
import { ShareEarnComponent } from './modules/share-earn/share-earn.component';
import { TopStoresComponent } from './modules/top-stores/top-stores.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BestOffersComponent } from './modules/best-offers/best-offers.component';
import { HeaderNewComponent } from './core/header-new/header-new.component';
import { CategoriesMenuComponent } from './core/categories-menu/categories-menu.component';
import { LoadOfferComponent } from './load-offer/load-offer.component';
import { TopstoreMenuComponent } from './core/topstore-menu/topstore-menu.component';
import { MaxlengthPipe } from './customPipe/maxlength.pipe';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BestofferMenuComponent } from './core/bestoffer-menu/bestoffer-menu.component';
import { CollectionComponent } from './modules/collection/collection.component';
import { TermsConditionComponent } from './core/terms-condition/terms-condition.component';
import { CateoriresNewComponent } from './modules/dashboard/cateorires-new/cateorires-new.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NameMaxLengthPipe } from './customPipe/name-max-length.pipe';
import { NoSpecialCharsDirective } from './no-special-chars.directive';
import { PasswordValidatorDirective } from './password-validator.directive';
import { ToastrModule } from 'ngx-toastr';
import { CollectionMenuComponent } from './modules/collection-menu/collection-menu.component';
import { NewHeaderComponent } from './core/new-header/new-header.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    CoupenPageComponent,
    SignupComponent,
    LoginComponent,
    ShareEarnComponent,
    TopStoresComponent,
    BestOffersComponent,
    HeaderNewComponent,
    CategoriesMenuComponent,
    LoadOfferComponent,
    TopstoreMenuComponent,
    MaxlengthPipe,
    BestofferMenuComponent,
    CollectionComponent,
    TermsConditionComponent,
    AboutUsComponent,
    NameMaxLengthPipe,
    NoSpecialCharsDirective,
    PasswordValidatorDirective,
    CollectionMenuComponent,
    NewHeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CarouselModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 15 seconds
      progressBar: true,
    }),
  ],

  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, CateoriresNewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
