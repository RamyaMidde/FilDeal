import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCatgryCouponComponent } from './food-catgry-coupon.component';

describe('FoodCatgryCouponComponent', () => {
  let component: FoodCatgryCouponComponent;
  let fixture: ComponentFixture<FoodCatgryCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodCatgryCouponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodCatgryCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
