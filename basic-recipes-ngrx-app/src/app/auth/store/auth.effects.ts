// import { Actions, ofType, Effect } from '@ngrx/effects'; // Effect is not supported by recent versions of NgRx

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, of, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";

import * as AuthActions from "./auth.actions";
import {AuthService} from "../auth.service";
import {UserModel} from "../user.model";
import {environment} from '../../../environments/environment';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(
    new Date().getTime() + expiresIn * 1000
  );
  const user = new UserModel(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
  // Alternative syntax:
  // return AuthActions.authenticateSuccess({
  //   email: email,
  //   userId: userId,
  //   token: token,
  //   expirationDate: expirationDate,
  // })
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
    // Alternative syntax:
    // return of(
    //   new AuthActions.authenticateFail({error: errorMessage})
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
  return of(new AuthActions.AuthenticateFail(errorMessage));
  // Alternative syntax:
  // return of(
  //   new AuthActions.authenticateFail({error: errorMessage})
  // );
}

@Injectable()
export class AuthEffects {
  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      // Alternative syntax:
      // ofType(AuthActions.signupStart),
      switchMap((signupAction: AuthActions.SignupStart) => {
        // Alternative syntax:
        // switchMap((signupAction) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseAPIKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true
            }
          )
          .pipe(
            tap(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              )
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      // Alternative syntax:
      // ofType(AuthActions.loginStart),
      switchMap((authData: AuthActions.LoginStart) => {
        // Alternative syntax:
        // switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseAPIKey,
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
            tap(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        // Alternative syntax:
        // ofType(AuthActions.authenticateSuccess),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
          if (authSuccessAction.payload.redirect) {
            this.router.navigate(['/']);
          }
        })
      ),
    {dispatch: false}
  );
  autoLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        // Alternative syntax:
        // ofType(AuthActions.autoLogin),
        map(() => {
          const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string,
          } = JSON.parse(localStorage.getItem('userData'));
          if (!userData) {
            return {type: 'Not login'};
          }
          const loadedUser = new UserModel(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
          );

          if (loadedUser.token) {
            const expirationDuration =
              new Date(userData._tokenExpirationDate).getTime() -
              new Date().getTime();
            this.authService.setLogoutTimer(expirationDuration);
            return new AuthActions.AuthenticateSuccess({
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser.token,
              expirationDate: new Date(userData._tokenExpirationDate),
              redirect: false
            });

            // Alternative syntax:
            // return AuthActions.authenticateSuccess({
            //   email: loadedUser.email,
            //   userId: loadedUser.id,
            //   token: loadedUser.token,
            //   expirationDate: new Date(userData._tokenExpirationDate),
            // });

            // const expirationDuration =
            //   new Date(userData._tokenExpirationDate).getTime() -
            //   new Date().getTime();
            // this.autoLogout(expirationDuration);
          }
          return {type: 'Not login'};
        })
      ),
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        // Alternative syntax:
        // ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    {dispatch: false}
  );


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
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
