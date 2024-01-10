import { Component, inject } from '@angular/core';
import { AuthService } from './authorization/auth.service';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'material-starter';
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor (private authService: AuthService) {
  }

  public isUserLoggedIn$: Observable<boolean> = this.authService.isLoggedIn();

  logout() {
    this.authService.logout();
  }
}
