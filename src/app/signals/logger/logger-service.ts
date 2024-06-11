import { Injectable, signal } from "@angular/core";
import { Log } from "./logger.component";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class LoggerService {
	logs: BehaviorSubject<Log[]> = new BehaviorSubject<Log[]>([]);

	log(message: string) {
		const log: Log = {
			id: this.logs.value.length + 1,
			time: new Date(),
			message: message
		};
		this.logs.next([...this.logs.value, log]);
	}

	getLogs(): Observable<Log[]> {
		return this.logs.asObservable();
	}
}