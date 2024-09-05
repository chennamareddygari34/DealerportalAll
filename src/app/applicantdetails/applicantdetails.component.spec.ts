import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantdetailsComponent } from './applicantdetails.component';

describe('ApplicantdetailsComponent', () => {
  let component: ApplicantdetailsComponent;
  let fixture: ComponentFixture<ApplicantdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
