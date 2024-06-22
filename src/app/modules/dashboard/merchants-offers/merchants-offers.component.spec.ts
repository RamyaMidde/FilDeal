import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsOffersComponent } from './merchants-offers.component';

describe('MerchantsOffersComponent', () => {
  let component: MerchantsOffersComponent;
  let fixture: ComponentFixture<MerchantsOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantsOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantsOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
