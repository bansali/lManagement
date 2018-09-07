import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIssuedBooksComponent } from './admin-issued-books.component';

describe('AdminIssuedBooksComponent', () => {
  let component: AdminIssuedBooksComponent;
  let fixture: ComponentFixture<AdminIssuedBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIssuedBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIssuedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
