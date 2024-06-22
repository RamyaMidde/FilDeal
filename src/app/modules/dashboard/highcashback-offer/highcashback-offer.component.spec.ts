import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighcashbackOfferComponent } from './highcashback-offer.component';

describe('HighcashbackOfferComponent', () => {
  let component: HighcashbackOfferComponent;
  let fixture: ComponentFixture<HighcashbackOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighcashbackOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighcashbackOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
