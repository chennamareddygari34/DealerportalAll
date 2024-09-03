import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { ApplicanteditComponent } from '../applicantedit/applicantedit.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

export interface Applicant {
  applicantId: number;
  vendorId: number;
  applicant1: string;
  email: string;
  phone: number;
  dateOfBirth: Date;
  gender: string;
  maritalStatus: string;
  occupationType: string;
  houseNo: string;
  city: string;
  district: string;
  state: string;
  landmark: string;
  pincode: number;
  country: string;
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  applicantDate: Date;
  status: string;
  lastUpdate: Date;
  loanType: string;
  loanDescription: string;
  maxLoanAmount: number;
}

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit {

  showApplicants: boolean = false;
  applicants: Applicant[] = [];
  applicantId: number = 0;
  applicant1: string = '';
  dateOfBirth: string = '';
  gender: string = '';
  maritalStatus: string = '';
  occupationType: string = '';
  email: string = '';
  phone: string = '';
  houseNo: string = '';
  city: string = '';
  district: string = '';
  state: string = '';
  landmark: string = '';
  pincode: string = '';
  country: string = '';
  loanAmount: number = 0;
  loanTerm: number = 0;
  interestRate: number = 0;
  monthlyPayment: number = 0;
  applicantDate: string = '';
  status: string = 'Application Sent';
  lastUpdate: string = '';
  loanType: string = 'Vehicle Loan';
  loanDescription: string = 'Loan Application for Vehicles';
  maxLoanAmount: number = 2000000;
  loanTerms: number[] = [6, 12, 18, 24, 26, 64];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Applicant>(this.applicants);
  displayedColumns: string[] = ['applicantName', 'email', 'occupationType', 'phone', 'actions'];
 
  vendors: any[] = [];
  selectedVendorId: number | null = null;
  vendorName: string = '';

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedVendorId = params['vendorId'] || null;
      this.vendorName = params['vendorName'] || '';
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newApplicant = {
        applicantId: this.applicantId,
        applicant1: this.applicant1,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
        maritalStatus: this.maritalStatus,
        occupationType: this.occupationType,
        email: this.email,
        phone: this.phone.toString(),
        houseNo: this.houseNo,
        city: this.city,
        district: this.district,
        state: this.state,
        landmark: this.landmark,
        pincode: this.pincode,
        country: this.country,
        vendorId: this.selectedVendorId || 0,  
        loanAmount: this.loanAmount,
        loanTerm: this.loanTerm,
        interestRate: this.interestRate,
        monthlyPayment: this.monthlyPayment,
        applicantDate: this.applicantDate,
        status: this.status,
        lastUpdate: this.lastUpdate,
        loanType: this.loanType,
        loanDescription: this.loanDescription,
        maxLoanAmount: this.maxLoanAmount
      };

      this.appService.addApplicant(newApplicant).subscribe(
        (response: any) => {
          this.snackBar.open('Applicant added successfully!', 'Close', {
            duration: 3000
          });
          form.resetForm();
        },
        (error: any) => {
          this.snackBar.open('Failed to add applicant. Please try again.', 'Close', {
            duration: 3000
          });
          console.error('Error adding applicant:', error);
        }
      );
    }
  }

  toggleApplicants(): void {
    this.showApplicants = !this.showApplicants;
    if (this.showApplicants) {
      this.loadApplicants();
    }
  }
  loadApplicants(): void {
    this.appService.getApplicantsByVendorIdToViewAllApplicantDetails(this.selectedVendorId || 0).subscribe(
      (response: Applicant[]) => {
        this.applicants = response;
        this.dataSource.data = this.applicants; 
        this.dataSource.paginator = this.paginator;
        
      },
      (error: any) => {
        console.error('Error loading applicants:', error);
        this.snackBar.open('Failed to load applicants. Please try again.', 'Close', {
          duration: 3000
        });
      }
    );
  }
  

  openEditApplicantDialog(app: Applicant): void {
    const dialogRef = this.dialog.open(ApplicanteditComponent, {
      width: '400px',
      data: { ...app, vendorName: this.vendorName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.UpdateApplicant(result.applicantId, result);
      }
    });
  }

  UpdateApplicant(appId: number, user: Applicant): void {
    this.appService.updateApplicant(appId, user).subscribe(
      (response) => {
        this.loadApplicants();
      },
      (error) => {
        console.error('Error Editing applicant', error);
      }
    );
  }


  deleteApplicant(applicant: Applicant): void {
    if (confirm('Are you sure you want to delete this applicant?')) {
      this.appService.deleteApplicant(applicant.applicantId).subscribe(
        () => {
          this.snackBar.open('Applicant deleted successfully!', 'Close', {
            duration: 3000
          });
          this.loadApplicants(); 
        },
        (error: any) => {
          this.snackBar.open('Failed to delete applicant. Please try again.', 'Close', {
            duration: 3000
          });
          console.error('Error deleting applicant:', error);
        }
      );
    }
  }
  getFormattedInterestRate(interestRate: number): string {
    return `${interestRate}%`;
  }
  calculateMonthlyPayment(): void {
    const P = this.loanAmount; // Principal
    const r = this.interestRate / 100 / 12; // Monthly interest rate
    const n = this.loanTerm; // Number of payments
  
    if (r === 0) {
      this.monthlyPayment = P / n;
    } else {
      this.monthlyPayment = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    }
  }
  
}
