import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAdminProductComponent } from './single-admin-product.component';

describe('SingleAdminProductComponent', () => {
  let component: SingleAdminProductComponent;
  let fixture: ComponentFixture<SingleAdminProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAdminProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
