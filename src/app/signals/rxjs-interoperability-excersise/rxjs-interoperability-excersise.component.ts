import { Component, EffectRef, Injectable, Injector, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { Task, TaskState } from '../task-list/task-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../MaterialModule';

@Component({
  selector: 'app-rxjs-interoperability-excersise',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
<p>Error:{{error()}}</p>
<section class=" w-96">
  <ng-container *ngFor="let task of newTasks()">
    <article class="todo-item p-8 m-8 bg-red-400">
      <p> {{ task.title }} </p>
      <button class="p-4" mat-button (click)="markAsDone(task)">Mark as Done</button>
    </article>
  </ng-container>
  <p class="counter"> {{totalNewTasks()}} / {{totalTasks()}} </p>
</section>

<section class=" w-96">
  <ng-container *ngFor="let task of doneTasks()">
    <article class="todo-item p-8 m-8 bg-green-400">
      {{ task.title }}
    </article>
  </ng-container>
  <p class="counter"> {{totalDoneTasks()}} / {{totalTasks()}} </p>
</section>

<button class="p-4" mat-button (click)="createNewTask()">Create a new Task</button>

<div class="stats">
  <p>
    Stats:
    <button class="p-4" mat-button (click)="statsOn()">Start</button>
    <button class="p-4" mat-button (click)="statsOff()">Stop</button>
  </p>
  <p> - Tasks marked as done: {{doneOperations()}} </p>
</div>
  `
})
export class RxjsInteroperabilityExcersiseComponent {

  // TODO use API to get data
  tasks: Signal<Task[]> = toSignal(this.api.getTasks()
    .pipe(catchError((error) => {
      this.error.set(error.message);
      return of();
    })), { initialValue: [] });

  error = signal<string | null>(null);

  newTasks = computed(() =>
    this.tasks().filter((task) => task.state === TaskState.New)
  );
  doneTasks = computed(() =>
    this.tasks().filter((task) => task.state === TaskState.Done)
  );

  totalTasks = computed(() => this.tasks().length);
  totalNewTasks = computed(() => this.newTasks().length);
  totalDoneTasks = computed(() => this.doneTasks().length);

  doneOperations = signal<number>(0);

  private doneEffect?: EffectRef;

  readonly TaskState = TaskState;

  constructor (private api: ApiService, private injector: Injector) {
    const observable$ = this.api.getTasks()
      .pipe(
        catchError((error) => {
          console.log('catched error');
          this.error.set(error.message);
          return of();
        }));
    this.tasks = toSignal(observable$, { injector: this.injector, initialValue: [] });

  }

  createNewTask() {
    this.api.createTask(NEW_TASK.title);
  }

  markAsDone(done: Task) {
    this.api.markAsDone(done);
  }

  statsOn() {
    this.doneEffect = effect(
      () => {
        this.totalDoneTasks();
      },
      { injector: this.injector, allowSignalWrites: true }
    );
  }

  statsOff() {
    this.doneEffect!.destroy();
  }
}


const NEW_TASK: Task = {
  title: 'Learn even more about the signals',
  state: TaskState.New,
  uuid: '31212'
};



@Injectable({
  providedIn: 'root'
})
export class ApiService implements APIService {
  readonly initialTasks: Task[] = [
    {
      title: 'Learn more about the signals',
      state: TaskState.New,
      uuid: '1'
    },
    {
      title: 'Learn even more about the signals',
      state: TaskState.New,
      uuid: '2'
    }
  ];
  readonly tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.initialTasks);
  private createdCount = signal<number>(0);
  private markedAsDoneCount = signal<number>(0);

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  createTask(title: string): Observable<Task[]> {
    this.createdCount.update(v => v + 1);
    if (this.createdCount() % 2 === 0)
      return throwError(new Error('Failed to mark as done'));

    const newTask: Task = {
      title,
      state: TaskState.New,
      uuid: Math.random().toString(36).substring(7)
    };
    this.tasks.next([...this.tasks.getValue(), newTask]);
    return this.tasks.asObservable();
  }

  markAsDone(task: Task): Observable<Task[]> {
    this.markedAsDoneCount.update(v => v + 1);
    if (this.markedAsDoneCount() % 5 === 0) {
      
      return throwError(new Error('Failed to mark as done'));
    }

    const modified = this.tasks.getValue().map(t => {
      if (t.uuid === task.uuid) {
        return {
          ...t,
          state: TaskState.Done
        };
      }
      return t;
    });
    this.tasks.next(modified);
    return this.tasks.asObservable();
  }
}

export interface APIService {

  getTasks(): Observable<Task[]>;

  createTask(title: string): Observable<Task[]>;

  markAsDone(task: Task): Observable<Task[]>;
}
