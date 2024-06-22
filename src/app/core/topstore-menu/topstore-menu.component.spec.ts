import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopstoreMenuComponent } from './topstore-menu.component';

describe('TopstoreMenuComponent', () => {
  let component: TopstoreMenuComponent;
  let fixture: ComponentFixture<TopstoreMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopstoreMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopstoreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
