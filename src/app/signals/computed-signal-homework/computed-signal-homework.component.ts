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

<button mat-raised-button (click)="reset()">reset</button>
<button mat-raised-button (click)="add()">add 1</button>
<button mat-raised-button (click)="multiply()">multiply by 2</button>
  `
})
export class ComputedSignalHomeworkComponent {

  value = signal(1);
  isPrime = computed<boolean>(() => isPrime(this.value()));

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
