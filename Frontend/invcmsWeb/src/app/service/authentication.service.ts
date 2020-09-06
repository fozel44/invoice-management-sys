import { Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserApi } from '../app-const/api-gateway';
import { Subject, timer, Observable } from 'rxjs';
import { User } from '../domain/user';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { AuthUrl, BasicToken } from '../app-const/const';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  static logout: any;
  static redirectTo(): string {
    throw new Error("Method not implemented.");
  }

  isLoggedIn = new Subject<boolean>();

  currentUserValue = new Subject<User>();



  tier2(miliseconds) {
    setTimeout(() => {
      this.logout();
    }, miliseconds);

  }

  constructor(private httpClient: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private storageService: StorageService) {
  }


  isAuthenticated() {
    let isLoggin = false
    const token = localStorage.getItem("access_token");
    const promise = new Promise(
      (resolve, reject) => {
        if (token) {
          isLoggin = true;
          this.isLoggedIn.next(isLoggin);
        } else {
          this.storageService.removeAllSesion();
          this.isLoggedIn.next(isLoggin);
        }
        resolve(isLoggin);
      }
    );
    return promise;
  }



  redirectTo() {
    if (this.isLoggedIn) {
      return "/"
    } else return "/login"
  }

  getCurrentUserPr() {
    let moken;
    this.httpClient.get(UserApi.getCurrentUser).subscribe(

      (ress: any) => {
        moken = ress
      },
      error => {

      }
    )
    const promise = new Promise(
      (resolve, reject) => {
        if (moken) {
          this.currentUserValue.next(moken);
        } else {
          this.storageService.removeAllSesion();
          this.currentUserValue.next(null);
        }
        resolve(moken);
      }
    );
    return promise;
  }


  login(user: User) {
    const urlWithParams = AuthUrl + "&username=" + user.email + "&password=" + user.password
    return this.httpClient.get(urlWithParams, BasicToken).pipe(map(
      data => {
        return data;
      }, error => {
        throw error
      }
    )).subscribe(
      respT => {
        if (respT["access_token"]) {
          localStorage.setItem("access_token", respT["access_token"])
          user.token = respT
          this.storageService.setUser(user)
          this.toastrService.success("Login Successful", "Redirecting...")
          //Call for Current User
          this.httpClient.get(UserApi.getCurrentUser).subscribe(

            (ress: any) => {
              ress.token = respT
              let a = respT["expires_in"]
              let aNumber: number = +a
              this.tier2(aNumber * 1000);
              this.currentUserValue = ress
              this.storageService.setUser(ress)
              this.isLoggedIn.next(true)
              this.router.navigate(["/"])
              return respT
            },
            error => {

            }
          )
        }
      },
      error => {
        this.toastrService.error("Login Failed.", "Oops!");

      }
    )

  }

  logout() {
    //return this.httpClient.post("http://localhost:8080/"+"logout",null)
    this.isLoggedIn.next(false)

    this.storageService.removeAllSesion()

    // localStorage.removeItem('access_token')
    // this.storageService.remove('access_token')
    // this.httpClient.get("http://localhost:8080/logout")
    //  this.router.navigate(["/login"])


  }

}
