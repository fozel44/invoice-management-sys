import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantProfileComponent } from './consultant-profile.component';

describe('ConsultantProfileComponent', () => {
  let component: ConsultantProfileComponent;
  let fixture: ComponentFixture<ConsultantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
