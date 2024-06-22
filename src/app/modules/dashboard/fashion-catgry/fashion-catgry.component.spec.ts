import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionCatgryComponent } from './fashion-catgry.component';

describe('FashionCatgryComponent', () => {
  let component: FashionCatgryComponent;
  let fixture: ComponentFixture<FashionCatgryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FashionCatgryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionCatgryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
