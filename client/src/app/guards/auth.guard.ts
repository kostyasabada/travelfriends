// import { Injectable } from '@angular/core';
// import { CanActivate, CanActivateChild, Router } from '@angular/router';
// import { Store } from '@ngrx/store';

// // import * as fromAuthActions from '@app/store/auth/auth.actions';
// // import { AppState } from '@app/interfaces/app.interfaces';
// import { AuthService } from '@app/services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate, CanActivateChild {
//   constructor(
//     private store: Store<AppState>,
//     private authService: AuthService
//   ) {}

//   canActivate(): boolean {
//     const jwt = this.authService.getJwt();
//     if (jwt) {
//       return true;
//     }

//     this.store.dispatch(fromAuthActions.logout({automaticLogout: true}));
//     return false;
//   }

//   canActivateChild(): boolean {
//     return this.canActivate();
//   }
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class NotAuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     const jwt = this.authService.getJwt();
//     if (jwt) {
//       this.router.navigate(['/'], { queryParamsHandling: 'preserve' });
//       return false;
//     }

//     return true;
//   }
// }
