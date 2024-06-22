import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCatergoriesComponent } from './other-catergories.component';

describe('OtherCatergoriesComponent', () => {
  let component: OtherCatergoriesComponent;
  let fixture: ComponentFixture<OtherCatergoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherCatergoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherCatergoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
