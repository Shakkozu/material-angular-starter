import { CommonModule } from '@angular/common';
import { Component, Signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { MaterialModule } from '../../MaterialModule';

@Component({
  selector: 'app-observables-error-handling',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <p>
      observables-error-handling works!
      <p>signal value: {{signalWithHandledError()}}</p>
      <p>signal value: {{signalWithHandledErrorOnSignalSite()}}</p>
        <div class="row">

          <button mat-raised-button (click)="generateNewObservable()">Generate new observable</button>
        </div>

  `
})
export class ObservablesErrorHandlingComponent {
  private subject = new Subject<any>();
  signal!: Signal<number | undefined>;
  signalWithHandledErrorOnSignalSite = computed(() => {
    try {
      return this.signal();
    } catch (error) {
      console.error('Error occurred', error);
      return null;
    }
  });
  signalWithHandledError: Signal<any>;

  constructor() {
    this.signal = toSignal(this.subject.asObservable());
    
    // catching an error on a observable site
    this.signalWithHandledError = toSignal(this.subject.asObservable().pipe(
      catchError((error) => {
        console.error('Error occurred', error);
        return of({error});
      })
    ));

    // catching an error on a signal site

  }

  public generateNewObservable() {
    if (Math.random() < 0.2) {
      this.subject.next(new Error('Random error occurred'));
    } else {
      const newValue = Math.floor(Math.random() * 100);
      this.subject.next(newValue);
    }
  }


}


