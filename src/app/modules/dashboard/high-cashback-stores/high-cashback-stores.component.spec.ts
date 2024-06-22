import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighCashbackStoresComponent } from './high-cashback-stores.component';

describe('HighCashbackStoresComponent', () => {
  let component: HighCashbackStoresComponent;
  let fixture: ComponentFixture<HighCashbackStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighCashbackStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighCashbackStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
