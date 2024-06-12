import { CommonModule } from '@angular/common';
import { Component, effect, signal, untracked } from '@angular/core';
import { MaterialModule } from '../MaterialModule';
import { Log, LoggerComponent } from '../signals/logger/logger.component';
import { LoggerService } from '../signals/logger/logger-service';

@Component({
  selector: 'app-untracked-signal-in-effect',
  standalone: true,
  imports: [CommonModule,
    LoggerComponent,
    MaterialModule],
  template: `
    <p>Value: {{ value() }}</p>
<p>Increment: +{{ increment() }} </p>

<button mat-raised-button (click)="reset()">reset</button>
<button mat-raised-button (click)="add()">add</button>
<button mat-raised-button (click)="increase()">increase</button>

<app-logger />
  `
})
export class UntrackedSignalInEffectComponent {
  value = signal<number>(0);
  increment = signal<number>(1);
  
  constructor (private loggerService: LoggerService) {
    effect(() => {
      const value = this.value();
      const incrementVal = untracked(this.increment);
      this.loggerService.log(`Value: ${ value }, Increment: ${ incrementVal }`);
      
      
    });
  }
  
  increase() {
    this.increment.update(inc => inc + 1);
  }
  add() {
    this.value.update(value => value + this.increment());
  }
  reset() {
    this.value.set(0);
  }
}
