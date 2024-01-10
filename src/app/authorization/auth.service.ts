import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLoggedIn = false;

  constructor() { }

  login(): void {
    this.isUserLoggedIn = true;
  }

  logout(): void {
    this.isUserLoggedIn = false;
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.isUserLoggedIn);
  }
}