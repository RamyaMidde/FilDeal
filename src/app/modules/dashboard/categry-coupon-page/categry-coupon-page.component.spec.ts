import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategryCouponPageComponent } from './categry-coupon-page.component';

describe('CategryCouponPageComponent', () => {
  let component: CategryCouponPageComponent;
  let fixture: ComponentFixture<CategryCouponPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategryCouponPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategryCouponPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
