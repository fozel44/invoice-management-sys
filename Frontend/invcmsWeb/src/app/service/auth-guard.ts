import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthenticationService } from './authentication.service';

import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { ApiGateway, UserApi } from '../app-const/api-gateway';
import { User } from '../domain/user';
import { Observable } from 'rxjs';
import { find, map } from 'rxjs/operators';
import { Role } from '../domain/role';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private storageService: StorageService,
    private httpClient: HttpClient,
    private userService: UserService,
    private authService: AuthenticationService) { }


  currentUser;
  crusdto
  //   async getCurrentUser() {
  //   let result = <User>await this.httpClient.get(UserApi.getCurrentUser).toPromise()
  //   return result

  // }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.isAuthenticated()) {
      let canActivate: boolean = false;
      return this.userService.getCurrentUser2().then(
        re => {

          this.currentUser = re
          console.log(this.currentUser)
          //this.currentUser= this.crusdto

          //this.currentUser=this.crusdto

          this.currentUser.token = localStorage.getItem("access_token")
          this.storageService.setUser(this.currentUser)


          // this.httpClient.get<any>(UserApi.getCurrentUser).subscribe(ress => {
          //   currentUserDto = ress
          //   ress.token = localStorage.getItem("access_token")
          //   this.storageService.setUser(ress)
          // },
          //   error => {
          //     this.authService.logout();
          //     return error
          //   },
          //   () => {
          //     currentUser = currentUserDto

          //   }
          // )

          let tempRoles = route.data.roles;
          if (route.data.roles === undefined) { return true }
          if (this.currentUser && route.data.roles) {

            for (let r of this.currentUser.roles) {
              if (route.data.roles && tempRoles.map(res => res.id === r.id).find(val => val === true)) {
                canActivate = true
               
              }
              else {
                canActivate = canActivate || false;
              


              }
              tempRoles = route.data.roles
            }



          }

          if (!canActivate) {
            //this.router.navigate(['/company-list']);
           
            return false;
          }
          return true

    }).catch(error => {
           this.authService.logout();
           return error
         })

  }else {
    this.router.navigate(['/login'])
    return false
  }
  

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}