// import { Actions, ofType, Effect } from '@ngrx/effects'; // Effect is not supported by recent versions of NgRx

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, of, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";

import * as AuthActions from "./auth.actions";
import {AuthResponseData} from "../auth.service";
import {Router} from "@angular/router";


@Injectable()
export class AuthEffects {
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      // Alternative syntax:
      // ofType(AuthActions.loginStart),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRxpxyppQQY7Y7BnZJiiI8D6BvnVGYsrc',
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
            // Alternative syntax:
            // {
            //   email: authData.email,
            //   password: authData.password,
            //   returnSecureToken: true
            // }
          )
          .pipe(
            map((resData) => {
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate,
              });
              // Alternative syntax:
              // return new AuthActions.login({
              //   email: resData.email,
              //   userId: resData.localId,
              //   token: resData.idToken,
              //   expirationDate: expirationDate
              // });
            }),
            catchError((errorRes) => {
              let errorMessage = 'An unknown error occurred!';
              if (!errorRes.error || !errorRes.error.error) {
                return of(new AuthActions.LoginFail(errorMessage));
                // Alternative syntax:
                // return of(
                //   new AuthActions.loginFail({error: errorMessage})
                // );
              }
              switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'This email exists already';
                  break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage = 'This email does not exist.';
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'This password is not correct.';
                  break;
              }
              return of(new AuthActions.LoginFail(errorMessage));
              // Alternative syntax:
              // return of(
              //   new AuthActions.loginFail({error: errorMessage})
              // );
            })
          );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {
  }
}


// Old syntax is not supported by recent versions of NgRx:

// @Injectable()
// export class AuthEffects {
//   @Effect()
//   authLogin = this.actions$.pipe(
//     ofType(AuthActions.LOGIN_START),
//     switchMap((authData: AuthActions.LoginStart) => {
//       return this.http
//         .post<AuthResponseData>(
//           'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRxpxyppQQY7Y7BnZJiiI8D6BvnVGYsrc',
//           {
//             email: authData.payload.email,
//             password: authData.payload.password,
//             returnSecureToken: true
//           }
//         ).pipe(
//           map(resData => {
//             const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
//
//             return new AuthActions.Login({
//               email: resData.email,
//               userId: resData.localId,
//               token: resData.idToken,
//               expirationDate: expirationDate
//             });
//           }),
//           catchError(errorResponse => {
//             let errorMessage = 'An unknown error occurred!';
//             if (!errorResponse.error || !errorResponse.error.error) {
//               return of(new AuthActions.LoginFail(errorMessage));
//             }
//             switch (errorResponse.error.error.message) {
//               case 'EMAIL_EXISTS':
//                 errorMessage = 'This email exists already.';
//                 break;
//               case 'EMAIL_NOT_FOUND':
//                 errorMessage = 'This email does not exist.';
//                 break;
//               case 'INVALID_PASSWORD':
//                 errorMessage = 'This password is not correct.'
//                 break;
//             }
//             return of(new AuthActions.LoginFail(errorMessage));
//           }),
//         );
//     }),
//   );
//
//   @Effect({dispatch: false})
//   authSuccess = this.actions$
//     .pipe(
//       ofType(AuthActions.LOGIN),
//       tap(() => {
//         this.router.navigate(['/']);
//       })
//     );
//
//   constructor(
//     private actions$: Actions,
//     private http: HttpClient,
//     private router: Router
//   ) {
//   }
// }
