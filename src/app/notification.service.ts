import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    })
  }

  showWarning(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['warning-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  showInfo(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['info-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
