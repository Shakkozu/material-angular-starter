import { Inject, Injectable, Signal, effect } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Observable, map, of, tap } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class NumberService {

	public isPrime(number: Signal<number>): Observable<boolean> {
		const observable = toObservable(number);
		return observable.pipe(
			map(num => this.isPrimeFunc(num)
			)
		);
	}

	private isPrimeFunc(num: number): boolean {
		for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
			if (num % i === 0) return false;
		}
		return num > 1;
	}
}
