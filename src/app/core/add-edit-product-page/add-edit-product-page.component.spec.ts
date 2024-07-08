import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductPageComponent } from './add-edit-product-page.component';

describe('AddEditProductPageComponent', () => {
  let component: AddEditProductPageComponent;
  let fixture: ComponentFixture<AddEditProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProductPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
