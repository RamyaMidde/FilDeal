import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStoreCategoriesComponent } from './top-store-categories.component';

describe('TopStoreCategoriesComponent', () => {
  let component: TopStoreCategoriesComponent;
  let fixture: ComponentFixture<TopStoreCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopStoreCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStoreCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
