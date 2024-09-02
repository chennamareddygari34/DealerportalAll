
import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  activeTab: string = 'applications';
  searchQuery: string = '';
  selectedStatus: string = '';  // Property for selected status
  deals: any[] = [];
  totalRecords: number = 0; 
  isShowTable: boolean = false;

  constructor(private appService: AppService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // Handle date changes and query data based on the selected date
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value?.toISOString().split('T')[0];
    if (selectedDate) {
      this.appService.searchDatabyIDorName(selectedDate).subscribe(
        data => {
          if (data && data.length > 0) {
            this.deals = data;
            this.isShowTable = true;
          } else {
            this.isShowTable = false;
            this.snackBar.open('No results found for the selected date', 'Close', {
              duration: 3000,
            });
          }
        },
        error => {
          this.isShowTable = false;
          this.snackBar.open('An error occurred while fetching data', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  // Handle search functionality
  onSearch() {
    if (this.searchQuery.trim()) {
      this.appService.searchDatabyIDorName(this.searchQuery).subscribe(
        data => {
          if (data && data.length > 0) {
            this.deals = data;
            this.isShowTable = true;
            this.totalRecords = data.length;
          } else {
            this.isShowTable = false;
            this.snackBar.open('No results found', 'Close', {
              duration: 3000,
            });
          }
        },
        error => {
          this.isShowTable = false;
          this.snackBar.open('An error occurred while searching', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please enter a search query', 'Close', {
        duration: 3000,
      });
    }
  }

  // Handle status changes and query data based on the selected status
  onStatusChange(status: string) {
    this.selectedStatus = status;
    if (status) {
      this.appService.getApplicantsByStatus(status).subscribe(
        data => {
          if (data && data.length > 0) {
            this.deals = data;
            this.isShowTable = true;
            this.totalRecords = data.length;
          } else {
            this.isShowTable = false;
            this.snackBar.open('No results found for the selected status', 'Close', {
              duration: 3000,
            });
          }
        },
        error => {
          this.isShowTable = false;
          this.snackBar.open('An error occurred while fetching data', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please select a status', 'Close', {
        duration: 3000,
      });
    }
  }
}