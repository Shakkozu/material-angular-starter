import { Component, isSignal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { LoggerService } from '../../logger/logger-service';
import { NumberService } from './number.service';
import { LoggerComponent } from '../../logger/logger.component';
import { MaterialModule } from '../../../MaterialModule';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-counter-with-observables',
  standalone: true,
  imports: [LoggerComponent, MaterialModule],
  template: `
    <p>Value: {{ value() }}</p>
<p> {{ isPrime() }} </p>
<p> [ {{isValueSignal}} {{isIsPrime$Signal}} {{isIsPrimeSignal}} ] </p>

<button mat-raised-button (click)="reset()">reset</button>
<button mat-raised-button (click)="add()">add 1</button>
<button mat-raised-button (click)="multiply()">multiply by 2</button>
<app-logger/>
  `
})
export class CounterWithObservablesComponent {
  public value = signal<number>(0);
  public isPrime$ = this.numberService.isPrime(this.value).pipe(
    debounceTime(500)
  );
  public isPrime = toSignal(this.isPrime$);

  readonly isValueSignal = isSignal(this.value);
  readonly isIsPrime$Signal = isSignal(this.isPrime$);
  readonly isIsPrimeSignal = isSignal(this.isPrime);
  
  constructor (private numberService: NumberService,
    private loggerService: LoggerService) {
    this.loggerService.register(this.value);
    const signalProperty = signal(10);

    signalProperty.set(20);
    setTimeout(() => {
      signalProperty.set(30);
      
    }, 500);
    setTimeout(() => {
      signalProperty.set(40);
      
    }, 1000);
  }
    
    reset() {
      this.value.set(0);
  }
  
    multiply() {
      this.value.update(v => v * 2);
  }
  
    add() {
      this.value.update(v => v + 1);
  }
}



