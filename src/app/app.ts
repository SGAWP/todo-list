import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatToolbar } from '@angular/material/toolbar';
import { TitleService } from './shared/services/title';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreationForm } from './shared/components/creation-form/creation-form';
import { EMPTY, Observable } from 'rxjs';
import { TaskI } from './shared/interfaces/task';
import { TaskService } from './shared/services/task';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FlexLayoutModule,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatDialogModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  tasks$: Observable<TaskI[]> = EMPTY;

  constructor(
    public titleService: TitleService,
    public router: Router,
    public dialog: MatDialog,
    private location: Location,
    private taskService: TaskService
  ) {}

  goBack(): void {
    this.location.back();
  }

  openCreationForm() {
    const dialogRef = this.dialog.open(CreationForm, {
      width: '700px',
      data: { title: 'Создать заявку' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasks$ = this.taskService.getTasks();
      }
    });
  }
}
