import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeNewCatgryComponent } from './recharge-new-catgry.component';

describe('RechargeNewCatgryComponent', () => {
  let component: RechargeNewCatgryComponent;
  let fixture: ComponentFixture<RechargeNewCatgryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeNewCatgryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeNewCatgryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
