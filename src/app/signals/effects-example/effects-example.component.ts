import { CommonModule } from '@angular/common';
import { Component, EffectRef, Injector, computed, effect, inject, signal } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';
import { LoggerComponent } from '../logger/logger.component';
import { LoggerService } from '../logger/logger-service';

@Component({
  selector: 'app-effects-example',
  standalone: true,
  imports: [CommonModule, MaterialModule, LoggerComponent],
  template: `
    <p>Value: {{ counterValue() }}</p>
    <p>IsLogged: {{ isLogged() }}</p>
<p> {{ isPrime() }} </p>

<button mat-raised-button (click)="reset()">reset</button>
<button mat-raised-button (click)="add()">add 1</button>
<button mat-raised-button (click)="multiply()">multiply by 2</button>
<button mat-raised-button (click)="startLogging()">Start logging</button>
<button mat-raised-button (click)="disableLogging()">Disable logging</button>

<app-logger />
  `
})
export class EffectsExampleComponent {
  private logEffect = effect(() => {
    console.log('new value: ', this.counterValue());
  });
  private anotherMethodOfCreatingInjector = inject(Injector);
  private loggingEffect!: EffectRef;
  isLogged = signal<boolean>(false);



  constructor (private logger: LoggerService,
    private injector: Injector
  ) {
    effect(() => {
      if (this.isPrime())
        this.logger.log('is prime');
    })
  }
  counterValue = signal<number>(0);
  isPrime = computed<boolean>(() => isPrime(this.counterValue()));


  /*
    There's a difference between
    setTimeout(() => {
      this.logger.log(`Counter value is: ${ this.counterValue() }`)
    }, 3000);

    AND

    const value = this.counterValue();
    setTimeout(() => {
          this.logger.log(`Counter value is: ${ value }`)
    }, 3000);
    
  The first method will log the value of the counter at the time of execution of the setTimeout function.
  Which means, if effect will be destroyed before the setTimeout function is executed,
  it won't log execute the logger.log function.

  The second method accessed the signal value before the setTimeout function is executed.
  Which means, when the effect is destroyed, the value of signal was already accessed,
  and without additional cleanup actions, the setTimeout function will execute the logger.log function.
  */
  public startLogging() {
    this.loggingEffect = effect(
      (onCleanup) => {
        const value = this.counterValue();
        const task = setTimeout(() => {
          this.logger.log(`Counter value is: ${ value }`)
        }, 3000);
        this.isLogged.set(true);

        /*
        The onCleanup function is not only called on destroy but also on every new incoming value.
        This means that when we emit a second event while the first setTimeout is still active
        (waiting for its 5-second timeout), it will clear the first timeout and start the timeout
         for the second event, and so on.

         Therefore, it is crucial to remember that the onCleanup function runs on every notification
          from dependent signals and on the effect's destruction.
        */
        onCleanup(() => {
          clearTimeout(task);
        });
      },
      {
        injector: this.anotherMethodOfCreatingInjector,
        allowSignalWrites: true
       }
    );
  }

  disableLogging() {
    if(this.loggingEffect)
      this.loggingEffect.destroy();
    this.isLogged.set(false);

  }

  /*
  Following code will throw an error
  Error: NG0203: effect() can only be used within an injection context such as a constructor,
  a factory function, a field initializer, or a function used with `runInInjectionContext`
  
  ngOnInit() {
    effect(
      () => this.logger.log(`init Event`),
    );
  }
  */


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

