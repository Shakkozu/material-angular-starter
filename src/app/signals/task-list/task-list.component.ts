import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h1>Task List</h1>
  <div class="">

    <section class="done">
      <ng-container *ngFor="let task of doneTasks()">
        <article  class="row p-4 my-4 rounded-xl bg-green-300" *ngIf="task.state === TaskState.Done">
          {{task.title}}
        </article>

      </ng-container>
    </section>
    <section class="new w-64">
      <div class="row p-4 my-4 rounded-xl bg-blue-300" *ngFor="let task of newTasks()">
          <article class="todo-item">
            {{task.title}}
            </article>
          <button class="my-2" mat-raised-button (click)="markAsDone(task.uuid)">Mark as done</button>
      </div>
    </section>
  
  <button mat-raised-button (click)="createNewTask()">Create a new Task</button>
  </div>
  `,
})
export class TaskListComponent {
  readonly TaskState = TaskState;

  doneTasks = signal<Task[]>([]);
  newTasks = signal<Task[]>([
    {
      uuid: '1',
      title: 'Learn more about the signals',
      state: TaskState.New,
    }
  ]);

  task = signal<Task[]>([]);

  createNewTask() {
    const uuid = Math.random().toString(36).substring(7);
    this.newTasks.update(tasks => [...tasks, { uuid, title: 'New Task', state: TaskState.New }]);
  }

  markAsDone(id: string) {
    const task = this.newTasks().find(t => t.uuid === id);
    if (!task)
      return;

    this.newTasks.update(tasks => tasks.filter(t => t.uuid !== id));
    this.doneTasks.update(tasks => [...tasks, {...task, state: TaskState.Done}])
  }


}


export interface Task {
  uuid: string,
  title: string;
  state: TaskState;
}

export enum TaskState {
  New,
  Done,
}