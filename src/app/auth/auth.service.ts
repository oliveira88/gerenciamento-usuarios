import { Injectable, OnInit } from '@angular/core';
/* import { Observable, of, tap, delay } from 'rxjs'; */
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor( private localStorageService: LocalStorageService ) { }

  ngOnInit() {
    this.localStorageService.setItem( "loggedIn", "false" );
  }

  /*
  // Se eu quisesse uma ação assíncrona, como o delay, poderia usar um
  // Observable pra encapsular esse dado "boolean":

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => this.isLoggedIn = true)
    );
  }
  */
  
  login(): void {
    this.localStorageService.setItem( "loggedIn", "true" );
  }

  logout(): void {
    this.localStorageService.setItem( "loggedIn", "false" );
  }

  isLoggedIn(): boolean {
    const boolString = this.localStorageService.getItem( "loggedIn" );
    return boolString === 'true';
  }
}
