import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-confirm',
  imports: [
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
  ],
  templateUrl: './confirm.html',
  styleUrl: './confirm.scss',
})
export class Confirm {
  constructor(
    public dialogRef: MatDialogRef<Confirm>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}
}
