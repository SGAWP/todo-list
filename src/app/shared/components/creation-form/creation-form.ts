import { Component, Inject } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-creation-form',
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatError
  ],
  templateUrl: './creation-form.html',
  styleUrl: './creation-form.scss',
})
export class CreationForm {
  
  form = new FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
  }>({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl('', { nonNullable: true }),
  });

  constructor(
    public dialogRef: MatDialogRef<CreationForm>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string },
    private taskService: TaskService
  ) {}

  onSubmit(): void {
    if (this.form.valid) {
      const { title, description } = this.form.getRawValue();
      this.taskService.createTask(title, description);
      this.form.reset();
    }
  }
}
