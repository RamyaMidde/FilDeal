import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupenPageComponent } from './coupen-page.component';

describe('CoupenPageComponent', () => {
  let component: CoupenPageComponent;
  let fixture: ComponentFixture<CoupenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoupenPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoupenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
