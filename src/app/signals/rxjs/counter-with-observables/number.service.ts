import { Inject, Injectable, Signal, effect } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class NumberService {

	public isPrime(number: Signal<number>): Observable<boolean> {
		return new Observable<boolean>(subscriber => {
			effect(() => {
				subscriber.next(this.isPrimeFunc(number()));
			}, {
				allowSignalWrites: true
			});
		});
	}

	private isPrimeFunc(num: number): boolean {
		for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
			if (num % i === 0) return false;
		}
		return num > 1;
	}
}
