import { CdkDrag, CdkDragHandle } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatDivider } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { PeriodicsStore } from "../periodic/store/periodic.store";

@Component({
  selector: "app-popup",
  standalone: true,
  templateUrl: "./popup.html",
  styleUrl: "./popup.css",
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    MatDialogTitle,
    MatDivider,
    CdkDrag,
    CdkDragHandle,
  ],
})
export class PopupComponent implements OnInit {
  protected dialogRef = inject(MatDialogRef<PopupComponent>);
  protected store = inject(PeriodicsStore);

  value = "";
  data = inject<{ value: string; element: { id: number; key: string } }>(
    MAT_DIALOG_DATA
  );

  ngOnInit(): void {
    this.value = this.data.value.trim();
  }

  onSave() {
    if (this.value.trim() === "") {
      return;
    }
    this.store.updateData(this.value, this.data.element);
    this.dialogRef.close();
  }
}
