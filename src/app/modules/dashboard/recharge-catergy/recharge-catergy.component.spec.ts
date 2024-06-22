import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeCatergyComponent } from './recharge-catergy.component';

describe('RechargeCatergyComponent', () => {
  let component: RechargeCatergyComponent;
  let fixture: ComponentFixture<RechargeCatergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeCatergyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeCatergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
