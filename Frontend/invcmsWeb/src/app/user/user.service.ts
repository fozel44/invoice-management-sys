import { Injectable } from '@angular/core';
import { BaseCrudOperationService } from '../base/base-crud-operation.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../domain/user';
import { UserApi } from '../app-const/api-gateway';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseCrudOperationService {

  url="/user/"
  constructor(protected httpClient:HttpClient) {
    super(httpClient);
  }

  getCurrentUser(){
    return this.httpClient.get<User>(UserApi.getCurrentUser)
  }

 async getCurrentUser2():Promise<any>{
    let result = await this.httpClient.get<any>(UserApi.getCurrentUser).toPromise()
    return result
  }

  


}
