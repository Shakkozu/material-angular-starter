import { Component } from '@angular/core';
import { WritableSignalComponent } from '../writable-signal/writable-signal.component';
import { MaterialModule } from '../../MaterialModule';
import { TaskListComponent } from '../task-list/task-list.component';
import { ComputedSignalComponent } from '../computed-signal/computed-signal.component';
import { CommonModule } from '@angular/common';
import { ComputedSignalHomeworkComponent } from '../computed-signal-homework/computed-signal-homework.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [WritableSignalComponent,
    CommonModule,
    MaterialModule,
    ComputedSignalComponent,
    ComputedSignalHomeworkComponent,
    TaskListComponent],
  template: `
  <h1>Signals</h1>
  <mat-divider></mat-divider>
  <div class="m-8">
    <app-writable-signal></app-writable-signal>
  </div>
  <mat-divider></mat-divider>
  <div class="m-8">
    <app-task-list></app-task-list>
  </div>
  <mat-divider></mat-divider>

  <div class="m-8">
    <app-computed-signal></app-computed-signal>

  </div>
  <mat-divider></mat-divider>
  
  <div class="m-8">
    <app-computed-signal-homework></app-computed-signal-homework>
    
    </div>
  <mat-divider></mat-divider>

  `,
  styles: ``
})
export class MainPageComponent {

}
