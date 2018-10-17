import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicemodelComponent } from './invoicemodel.component';

describe('InvoicemodelComponent', () => {
  let component: InvoicemodelComponent;
  let fixture: ComponentFixture<InvoicemodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicemodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
