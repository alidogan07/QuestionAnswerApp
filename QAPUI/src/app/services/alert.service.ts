import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';
import { Resp } from '../models/Resp';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private dialogRef: MatDialogRef<AlertDialogComponent>;
  constructor(
    private matDialog: MatDialog
  ) { }

  useAlert(r: Resp) {
    var title: string = "";
    if (r.job) {
      title = "Tamam";
    } else {
      title = "Hata";
    }

    this.dialogRef = this.matDialog.open(AlertDialogComponent, {
      width: "300px"
    });

    this.dialogRef.componentInstance.dialogTitle = title;
    this.dialogRef.componentInstance.dialogMessage = r.message;
    this.dialogRef.componentInstance.dialogJob = r.job;

    this.dialogRef.afterClosed().subscribe(d => {
      this.dialogRef = null;
    });
  }
}
