import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    public auth: AuthService,
    public router: Router,
    private snackBarService: SnackbarService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token: any = localStorage.getItem('token');
    let tokenPayload: any;

    try {
      tokenPayload = jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }

    let checkRole = false;

    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] === tokenPayload.role) {
        checkRole = true;
      }
    }

    if (tokenPayload.role === 'user' || tokenPayload.role === 'admin') {
      if (this.auth.isAuthenticated() && checkRole) {
        return true;
      }
      this.snackBarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.router.navigate(['/cafe/dashboard']); // or another appropriate route
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
