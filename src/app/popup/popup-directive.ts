import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PopupComponent } from "./popup";

@Directive({
  selector: "[appEditable]",
  standalone: true,
})
export class EditableDirective {
  @Input("appEditable") element!: { id: number; key: string };
  cellRef = inject(ElementRef<HTMLElement>);

  readonly dialog = inject(MatDialog);

  constructor() {
    this.cellRef.nativeElement.style.cursor = "pointer";
  }

  @HostListener("click")
  onOpen() {
    if (this.element.key === "position") return;

    const rect = this.cellRef.nativeElement.getBoundingClientRect();

    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        value: this.cellRef.nativeElement.childNodes[0].textContent,
        element: this.element,
      },
      position: {
        left: rect.left + rect.width / 2 + "px",
        top: rect.top + rect.height / 4 + "px",
      },
    });
    this.adjustPosition(dialogRef, rect);

    dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === "Enter") {
        dialogRef.componentInstance.onSave();
        dialogRef.close();
      }
    });
  }

  private adjustPosition(
    dialogRef: MatDialogRef<PopupComponent>,
    rect: DOMRect
  ) {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const dialogEl = document.querySelector(
      ".cdk-dialog-container"
    ) as HTMLElement;

    const dialogRect = dialogEl.getBoundingClientRect();

    let newTop;
    let newLeft;

    if (dialogRect.right > viewport.width) {
      newLeft = rect.left - dialogRect.width;
    }

    if (dialogRect.bottom > viewport.height) {
      newTop = rect.top - dialogRect.height;
    }

    dialogRef.updatePosition({
      left: newLeft ? newLeft + "px" : dialogRect.left + "px",
      top: newTop ? newTop + "px" : dialogRect.top + "px",
    });
  }
}
