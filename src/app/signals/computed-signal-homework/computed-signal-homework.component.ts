import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';

@Component({
  selector: 'app-computed-signal-homework',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <h1>Computed Signal Homework</h1>
    <p>Value: {{ value() }}</p>
<p> {{ isPrime() }} </p>

<button [ngClass]="{'green-400': true}" mat-raised-button (click)="reset()">reset</button>
<button mat-raised-button (click)="add()">add 1</button>
<button mat-raised-button (click)="multiply()">multiply by 2</button>

<p>Adding 1 to value will change isPrime: {{ incrementingCounterResultsInPrimeNumber() }}</p>
<p>Multiplying value by 2 will change isPrime: {{ multiplyingValueResultsInPrimeNumber() }}</p>

<p>Incrementing counter will modify isPrime flag: {{ incrementingCounterWillChangeIsPrimeState() }}</p>
  `
})
export class ComputedSignalHomeworkComponent {

  value = signal(1);
  isPrime = computed<boolean>(() => isPrime(this.value()));
  incrementingCounterResultsInPrimeNumber = computed<boolean>(() => isPrime(this.value() + 1));
  multiplyingValueResultsInPrimeNumber = computed<boolean>(() => isPrime(this.value() * 2));

  incrementingCounterWillChangeIsPrimeState = computed<boolean>(() => {
    console.log('incrementingCounterWillChangeIsPrimeState');
    const currentValue = this.isPrime();
    const afterIncrement = this.incrementingCounterResultsInPrimeNumber();
    return currentValue !== afterIncrement;
  });



  add() {
    this.value.update(v => v + 1);
  }

  multiply() {
    this.value.update(v => v * 2);
  }

  reset() {
    this.value.set(1);
  }
}



function isPrime(num: number): boolean {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}
