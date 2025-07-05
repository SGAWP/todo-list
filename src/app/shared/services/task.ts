import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TaskI } from '../interfaces/task';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: TaskI[] = [];
  private tasks$ = new BehaviorSubject<TaskI[]>(this.tasks);

  getTasks(): Observable<TaskI[]> {
    return this.tasks$
      .asObservable()
      .pipe(
        map((tasks) =>
          tasks
            .slice()
            .sort(
              (previousTask, nextTask) =>
                nextTask.createdAt.getTime() - previousTask.createdAt.getTime()
            )
        )
      );
  }

  getTaskById(id: string): Observable<TaskI> {
    return this.tasks$.asObservable().pipe(
      map((tasks) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) {
          throw new Error(`Задача № ${id} не найдена.`);
        }
        return task;
      })
    );
  }

  createTask(title: string, description?: string): void {
    const newTask: TaskI = {
      id: uuidv4(),
      title,
      description,
      status: false,
      createdAt: new Date(),
    };
    const updatedTasks = [...this.tasks$.value, newTask];
    this.tasks$.next(updatedTasks);
  }

  deleteTask(id: string): void {
    const updatedTasks = this.tasks$.value.filter((task) => task.id !== id);
    this.tasks$.next(updatedTasks);
  }

  toggleStatus(id: string): void {
    const updatedTasks = this.tasks$.value.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    this.tasks$.next(updatedTasks);
  }
}
