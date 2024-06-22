import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateoriresNewComponent } from './cateorires-new.component';

describe('CateoriresNewComponent', () => {
  let component: CateoriresNewComponent;
  let fixture: ComponentFixture<CateoriresNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateoriresNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CateoriresNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
