import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoiceDialogComponent } from './edit-invoice-dialog.component';

describe('EditInvoiceDialogComponent', () => {
  let component: EditInvoiceDialogComponent;
  let fixture: ComponentFixture<EditInvoiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInvoiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
