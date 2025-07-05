import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../shared/services/title';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TaskI } from '../../shared/interfaces/task';
import { TaskService } from '../../shared/services/task';
import { EMPTY, Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardActions,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Confirm } from '../../shared/components/confirm/confirm';

@Component({
  selector: 'app-tasks',
  imports: [
    FlexLayoutModule,
    AsyncPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCardContent,
    MatButton,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  tasks$: Observable<TaskI[]> = EMPTY;

  constructor(
    public titleService: TitleService,
    public dialog: MatDialog,
    private taskService: TaskService
  ) {
    this.titleService.title = 'Мои задачи';
  }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  remove(task: TaskI): void {
    let dialogRef = this.dialog.open(Confirm, {
      data: {
        title: 'Подтвердите действие',
        message: `Вы уверены, что хотите удалить задачу "${task.title}"?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.deleteTask(task.id);
      }
    });
  }
}
