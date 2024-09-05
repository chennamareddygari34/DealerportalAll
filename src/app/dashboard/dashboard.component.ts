import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vendorId: string | null = null;
  vendorName: string = '';
  deals: any[] = [];
  selectedRange: string = 'monthToDate';
  applicationsSent: number = 0;
  applicationsPending: number = 0;
  applicationsApproved: number = 0;
  contractsPending: number = 0;
  contractsFunded: number = 0;
  totalPaymentsToDealer: number = 0;
  totalRecords: number = 0;

  constructor(private appService: AppService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.appService.currentVendorId.subscribe(vendorId => {
      this.vendorId = vendorId;
      if (vendorId) {
        this.fetchDeals(vendorId);
      } else {
        this.deals = [];
      }
    });
  }

  onRangeChange(checked: string): void {
    this.selectedRange = checked;
    this.fetchDeals(this.vendorId || '');
  }

  // fetchDeals(vendorId: string) {
  //   const now = new Date();
  //   let startDate: Date;
  //   let endDate: Date = new Date();
  //   let startDate1: Date;

  //   this.resetCounts();
  //   this.cdr.detectChanges();

  //   this.appService.getDeals(vendorId).subscribe(
  //     data => {
  //       this.deals = data;
  //       this.totalRecords = data.length;
  //       this.vendorName = this.deals[0]?.vendorName || '';
  //       this.appService.changeVendorName(this.vendorName);

  //       if (this.selectedRange === 'monthToDate') {
  //         startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  //       } else if (this.selectedRange === 'last30Days') {
  //         startDate1 = new Date();
  //         startDate1.setDate(now.getDate() - 30);
  //       }

  //       const startDateToUse = this.selectedRange === 'monthToDate' ? startDate : startDate1;

  //       this.applicationsSent = this.filterDeals(startDateToUse, endDate, 'Application Sent');
  //       this.applicationsPending = this.filterDeals(startDateToUse, endDate, 'Application Pending');
  //       this.applicationsApproved = this.filterDeals(startDateToUse, endDate, 'Application Approved');
  //       this.contractsPending = this.filterDeals(startDateToUse, endDate, 'Contract Pending');
  //       this.contractsFunded = this.filterDeals(startDateToUse, endDate, 'CreditFunded');
  //       this.totalPaymentsToDealer = this.filterDeals(startDateToUse, endDate, 'TotallyCredited');

  //       this.cdr.detectChanges();
  //     },
  //     error => {
  //       console.error('Error fetching deals', error);
  //     }
  //   );
  // }
  fetchDeals(vendorId: string) {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = new Date();
    let startDate1: Date;
  
    this.resetCounts();
    this.cdr.detectChanges();
  
    this.appService.getDeals(vendorId).subscribe(
      data => {
        if (data && data.length > 0) {
          this.deals = data;
          this.totalRecords = data.length;
          this.vendorName = this.deals[0]?.vendorName || '';
        } else {
          this.deals = [];
          this.totalRecords = 0;
          this.vendorName = ''; // Set to empty string or some default value if no data
        }
        this.appService.changeVendorName(this.vendorName);
  
        if (this.selectedRange === 'monthToDate') {
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else if (this.selectedRange === 'last30Days') {
          startDate1 = new Date();
          startDate1.setDate(now.getDate() - 30);
        }
  
        const startDateToUse = this.selectedRange === 'monthToDate' ? startDate : startDate1;
  
        this.applicationsSent = this.filterDeals(startDateToUse, endDate, 'Application Sent');
        this.applicationsPending = this.filterDeals(startDateToUse, endDate, 'Application Pending');
        this.applicationsApproved = this.filterDeals(startDateToUse, endDate, 'Application Approved');
        this.contractsPending = this.filterDeals(startDateToUse, endDate, 'Contract Pending');
        this.contractsFunded = this.filterDeals(startDateToUse, endDate, 'CreditFunded');
        this.totalPaymentsToDealer = this.filterDeals(startDateToUse, endDate, 'TotallyCredited');
  
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching deals', error);
        // Handle error gracefully
        if (error.status === 404) {
          this.deals = [];
          this.totalRecords = 0;
          this.vendorName = ''; // Ensure vendorName is updated even if no data is found
          this.appService.changeVendorName(this.vendorName);
        }
      }
    );
  }
  

  filterDeals(startDate: Date, endDate: Date, status: string): number {
    return this.deals.filter(deal => {
      const dealDate = new Date(deal.applicantDate);
      return dealDate >= startDate && dealDate <= endDate && deal.status.trim() === status;
    }).length;
  }

  resetCounts() {
    this.applicationsSent = 0;
    this.applicationsPending = 0;
    this.applicationsApproved = 0;
    this.contractsPending = 0;
    this.contractsFunded = 0;
    this.totalPaymentsToDealer = 0;
  }

  loadDealsLazy(event: any) {
    const { first, rows } = event;
    if (this.vendorId) {
      this.appService.getDeals(this.vendorId).subscribe(
        data => {
          this.deals = data.slice(first, first + rows);
        },
        error => {
          console.error('Error fetching deals', error);
        }
      );
    }
  }

  navigateToApplicantCreation() {
    this.router.navigate(['/applicant'], { queryParams: { vendorId: this.vendorId, vendorName: this.vendorName } });
  }
  navigateToDocumentVerification() {
    this.router.navigate(['/documentverification']);
  }

  navigateToLoanStatus() {
    this.router.navigate(['/loanstatus']);
  }

  navigateToCreditScore() {
    this.router.navigate(['/creditscore']);
  }
  getAllApplications() {
    this.router.navigate(['/deals']);
  }
}