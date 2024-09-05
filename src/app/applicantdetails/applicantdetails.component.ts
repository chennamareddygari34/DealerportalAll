import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicantdetails.component.html',
  styleUrls: ['./applicantdetails.component.scss']
})
export class ApplicantdetailsComponent implements OnInit {
  applicant: any;
  vendorName: string = ''; 

  constructor(
    public dialogRef: MatDialogRef<ApplicantdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.applicant = this.data.applicant || {};
    this.vendorName = this.data.vendorName || '';
  }

  goBack(): void {
    this.dialogRef.close();
  }
}

