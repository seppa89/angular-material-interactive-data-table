import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ELEMENT_DATA } from "./store/mock-data";
import { PeriodicElement } from "./store/periodic.model";

@Component({
  selector: "app-periodic",
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: "./periodic.html",
  styleUrl: "./periodic.css",
})
export class Periodic {
  readonly periodics = new MatTableDataSource(ELEMENT_DATA);

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

  readonly displayedColumns = this.columns.map((c) => c.columnDef);

  applyFilter(filterValue: string) {
    this.periodics.filter = filterValue.trim().toLowerCase();
  }
}
