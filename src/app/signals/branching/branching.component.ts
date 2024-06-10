import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';

@Component({
  selector: 'app-branching',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
  <mat-expansion-panel expanded="true">
    <mat-expansion-panel-header>
      <mat-panel-title>
        <h2 class="p-4">Branching</h2>
      </mat-panel-title>
    </mat-expansion-panel-header>
    <ng-content select="selector">
      <p> {{ name() }} </p>
      <p> {{ showName() }} </p>
      <p> {{ computedName() }} </p>

      <button mat-raised-button (click)="changeName()">Change name</button>
      <button mat-raised-button (click)="changeShowName()">Change show name</button>
      <button mat-raised-button (click)="glitchFreeComputations()">test</button>

    </ng-content>

      
  </mat-expansion-panel>
  `
})
export class BranchingComponent {

  glitchFreeComputations() {
    const dependentSignal1 = signal(0);
    const dependentSignal2 = computed(() => dependentSignal1() + 10);
    const dependentSignal3 = computed(() => dependentSignal1() * 10);

    const computedSignal = computed(() => {
      const value1 = dependentSignal2();
      const value2 = dependentSignal3();
      return value1 + value2;
    });
    console.log(`[Branching Component] ${computedSignal()}`); // 0 + 10 = 10

    // changes to dependent signals trigger the computation only once
    dependentSignal1.set(5);
    console.log(`[Branching Component] ${computedSignal()}`); // 15 + 50 = 55
  }


  name = signal('John');
  showName = signal(true);
  computedName = computed(() => {
    console.log('[Branching Component] computing name');
    return this.showName() ? `Hello, ${ this.name() }` : `Hello, stranger`;
  });

  changeShowName() {
    this.showName.update(v => !v);
  }

  changeName() {
    const currentName = this.name();
    const names = ['John', 'Jane', 'Alice', 'Bob'].filter(name => name !== currentName);

    const randomIndex = Math.floor(Math.random() * names.length);
    this.name.set(names[randomIndex]);
  }

  test() {
    const name = this.showName();
    return 5;
  }


  // example of not allowed compute function with side effects
  // generates error in console
  // invalidComputed = computed(() => {
  //   this.changeShowName();
  //   const value = this.name();
  //   return value;

  // });
  
}
