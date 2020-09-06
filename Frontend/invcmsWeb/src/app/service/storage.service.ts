import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  user = "userToken";

	constructor( private router: Router) { }

   setUser(user) {
		sessionStorage.setItem(this.user, JSON.stringify(user));
	}

   getUser(): User {
		return JSON.parse(sessionStorage.getItem(this.user));
	}

   removeUser() {
		sessionStorage.removeItem(this.user);
	}

   get(key){
    const data = sessionStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
    return null;
  }
   set(key: string, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
   remove(key: string) {
    if (this.exists(key)) {
      localStorage.removeItem(key);
    }
    else return console.log("Logout button repeat")
  }
   exists(key: string): boolean {
    if(sessionStorage.getItem(key)){ 
      return sessionStorage.getItem(key) !== null;
    }
    else if (localStorage.getItem(key)){
      return localStorage.getItem(key) !== null;

    }
    else return false 
  }

  removeAllSesion(){
    sessionStorage.clear();
    localStorage.clear()
    this.router.navigate(['/login']);

  }
}
