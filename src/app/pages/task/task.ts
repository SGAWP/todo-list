import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TitleService } from '../../shared/services/title';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { TaskI } from '../../shared/interfaces/task';
import { TaskService } from '../../shared/services/task';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Confirm } from '../../shared/components/confirm/confirm';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-task',
  imports: [
    FlexLayoutModule,
    AsyncPipe,
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton,
  ],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task implements OnInit {
  task$: Observable<TaskI> = EMPTY;

  constructor(
    private route: ActivatedRoute,
    public titleService: TitleService,
    private taskService: TaskService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.titleService.title = `Задача №${this.route.snapshot.paramMap.get(
      'id'
    )}`;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task$ = this.taskService.getTaskById(id);
    }
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
        this.router.navigate(['/tasks']);
      }
    });
  }

  toggleSuccess(task: TaskI): void {
    let dialogRef = this.dialog.open(Confirm, {
      data: {
        title: 'Подтвердите действие',
        message: `Вы уверены, что хотите изменить статус задачи на Выполнена?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskService.toggleStatus(task.id);
      }
    });
  }
}
