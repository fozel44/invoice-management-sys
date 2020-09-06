import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudOperationService } from '../base/base-crud-operation.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseCrudOperationService{
  
  url="/role/"
  constructor(protected httpClient:HttpClient) {
    super(httpClient);
  }

}
