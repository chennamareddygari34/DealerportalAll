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
  vendorIdForDate: any;
  deals: any[] = [];
  selectedRange: string = 'monthToDate';
  applicationsSent: any = 0;
  applicationsPending: any = 0;
  applicationsApproved: any = 0;
  contractsPending: any = 0;
  contractsFunded: any = 0;
  totalPaymentsToDealer: any = 0;
  totalRecords: number = 0;

  constructor(private appService: AppService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.appService.currentVendorId.subscribe(vendorId => {
      this.vendorId = vendorId;
      this.vendorIdForDate = vendorId;
      if (vendorId) {
        this.fetchDeals(vendorId);
      } else {
        this.deals = [];
      }
    });
  }

  onRangeChange(checked: any): void {
    this.selectedRange = checked === 'monthToDate' ? 'monthToDate' : 'last30Days';
    this.fetchDeals(this.vendorIdForDate);
  }

  fetchDeals(vendorId: string) {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = new Date();
    let startDate1: Date;

    this.resetCounts();
    this.cdr.detectChanges();

    this.appService.getDeals(vendorId).subscribe(
      data => {
        this.deals = data;
        this.totalRecords = data.length;
        this.appService.changeVendorName(this.deals[0]?.vendorName || '');

        if (this.selectedRange === 'monthToDate') {
          startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the current month
        } else if (this.selectedRange === 'last30Days') {
          startDate1 = new Date();
          startDate1.setDate(now.getDate() - 30); // Last 30 days
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
    this.router.navigate(['/applicant']);
  }
  
  getAllApplications() {
    this.router.navigate(['/deals']);
  }
}
