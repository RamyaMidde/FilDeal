import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestofferMenuComponent } from './bestoffer-menu.component';

describe('BestofferMenuComponent', () => {
  let component: BestofferMenuComponent;
  let fixture: ComponentFixture<BestofferMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestofferMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestofferMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
