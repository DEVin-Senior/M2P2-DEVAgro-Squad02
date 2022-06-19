import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../_services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GrainEditGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.isLogged();
    return this.authService.isGrainFromCompany(route.params['id']);
  }

}
