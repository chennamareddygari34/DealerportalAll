import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  budgetMin: number = 0;
  budgetMax: number = 1000;
  budget: number = 500;
  constructor() { }
  resetBudget() {
    this.budgetMin = 0;
    this.budgetMax = 1000;
    this.budget = 500;
  }
  ngOnInit(): void {
  }

}
