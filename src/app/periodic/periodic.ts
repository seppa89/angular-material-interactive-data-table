import { CommonModule } from "@angular/common";
import { Component, effect, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { PeriodicElement } from "./store/periodic.model";
import { PeriodicsStore } from "./store/periodic.store";

@Component({
  selector: "app-periodic",
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinner,
  ],
  templateUrl: "./periodic.html",
  styleUrl: "./periodic.css",
})
export class Periodic implements OnInit {
  periodics = new MatTableDataSource<PeriodicElement>([]);

  columns = [
    {
      columnDef: "position",
      header: "Number",
      cell: (element: PeriodicElement) => `${element.position}`,
    },
    {
      columnDef: "name",
      header: "Name",
      cell: (element: PeriodicElement) => `${element.name}`,
    },
    {
      columnDef: "weight",
      header: "Weight",
      cell: (element: PeriodicElement) => `${element.weight}`,
    },
    {
      columnDef: "symbol",
      header: "Symbol",
      cell: (element: PeriodicElement) => `${element.symbol}`,
    },
  ];

  protected readonly displayedColumns = this.columns.map((c) => c.columnDef);
  protected store = inject(PeriodicsStore);

  constructor() {
    effect(() => {
      this.periodics.data = this.store.periodics();
      this.periodics.filter = this.store.filter().query;
    });
  }

  ngOnInit(): void {
    this.store.fakeFetchData();
  }

  applyFilter(filterValue: string) {
    this.store.updateFilter(filterValue.trim());
  }

  clearFilter(input: HTMLInputElement) {
    input.value = "";
    this.store.updateFilter("");
  }
}
