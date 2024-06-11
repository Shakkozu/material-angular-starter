import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';
import { LoggerComponent } from '../logger/logger.component';
import { LoggerService } from '../logger/logger-service';

@Component({
  selector: 'app-effects-example',
  standalone: true,
  imports: [CommonModule, MaterialModule, LoggerComponent],
  template: `
    <p>Value: {{ counterValue() }}</p>
<p> {{ isPrime() }} </p>

<button mat-raised-button (click)="reset()">reset</button>
<button mat-raised-button (click)="add()">add 1</button>
<button mat-raised-button (click)="multiply()">multiply by 2</button>

<app-logger />
  `
})
export class EffectsExampleComponent {
  constructor (private logger: LoggerService) {
    effect(() => {
      if (this.isPrime())
        this.logger.log('is prime');
      
    
    })
    effect(() => {
      const value = this.counterValue();
      this.logger.log(`value: ${value}`);
    });
  }
  counterValue = signal<number>(0);
  isPrime = computed<boolean>(() => isPrime(this.counterValue()));

  
  multiply() {
    this.counterValue.update(currentValue => currentValue * 2);
  }

  add() {
    this.counterValue.update(currentValue => currentValue + 1);
  }
  reset() {
    this.counterValue.set(0);
  }
}

function isPrime(num: number): boolean {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

