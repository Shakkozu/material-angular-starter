import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';

@Component({
  selector: 'app-computed-signal',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h2>Computed Signal</h2>
    <p class="my-4">
      counter value: {{counter}}
      isEven: {{isEven}}
      isEvenFunc: {{isEvenFunc()}}
    </p>
    <p class="my-4">
      signal counter value: {{counterSignal()}}
      signal isEven: {{isEvenSignal()}}
    </p>
    <button mat-raised-button (click)="onClick()">Increae counter</button>
    <button mat-raised-button (click)="addPrice()">Add new price</button>

    <p>Prices: {{prices()}}</p>
    <p>Total: {{total()}}</p>
  `
})
export class ComputedSignalComponent {
  counter: number = 0;
  isEven: boolean = true;


  counterSignal = signal(0);
  isEvenSignal = computed(() => {
    console.log('computed signal');
    return this.counterSignal() % 2 === 0;
  });
  
  prices = signal([10, 20, 30]);
  total = computed(() => {
    console.log('computed total is called');
    return this.prices().reduce((total, price) => total + price, 0);
  });

  addPrice() {
    const newPrice = Math.floor(Math.random() * 100);
    this.prices.update(prices => prices.concat(newPrice));
  }

  isEvenFunc() {
    console.log('isEvenFunc');
    return this.counter % 2 === 0;

  }

  onClick() {
    this.counter += 1;
    this.isEven = this.counter % 2 === 0;

    this.counterSignal.update(v => v + 1);
  }

}
