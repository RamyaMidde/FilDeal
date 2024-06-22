import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStoresComponent } from './top-stores.component';

describe('TopStoresComponent', () => {
  let component: TopStoresComponent;
  let fixture: ComponentFixture<TopStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
