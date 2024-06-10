import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';

@Component({
  selector: 'app-writable-signal',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h1>Writable Signal</h1>
    <p>
      {{value()}}
    </p>
    <p>
      {{notSignalValue}}
    </p>

    <button mat-raised-button (click)="reset()">reset</button>
<button mat-raised-button (click)="add()">add 1</button>
<button mat-raised-button (click)="multiply()">multiply by 2</button>
  `,
})
export class WritableSignalComponent {
  value = signal(15);
  notSignalValue = 15;

  constructor () {
    setInterval(() => {
      this.value.update(v => v + 1);
    }, 1000);
    setInterval(() => {
      this.notSignalValue++;
    }, 1000);
  }

  reset() {
    this.value.set(0);
  }

  add() {
    this.value.update(v => v + 1);
  }

  multiply() {
    this.value.update(v => v * 2);
  }

}
