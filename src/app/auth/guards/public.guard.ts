import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
  Router,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAuthenticated) => console.log('está logado ?: ', isAuthenticated) ),

      tap((isAuthenticated) => {
        console.log('tá safe pode ver a rota de login');
        if (isAuthenticated) this.router.navigate(['./']);
      }),

      // deixo passar caso seja false isAuthenticated por que pode ver as rotas de login
      map( isAuthenticated => !isAuthenticated)
    );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthStatus();
  }
}
