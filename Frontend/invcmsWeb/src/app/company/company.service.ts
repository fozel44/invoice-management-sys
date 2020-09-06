import { Injectable } from '@angular/core';
import { BaseCrudOperationService } from '../base/base-crud-operation.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseCrudOperationService {
  url="/company/"
  constructor(protected httpClient:HttpClient) {
    super(httpClient);
  }

 
 
  
}

