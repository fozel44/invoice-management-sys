import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudOperationService } from './base-crud-operation.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService extends BaseCrudOperationService {

  constructor(protected httpClient:HttpClient) {
    super(httpClient)
   }
}
