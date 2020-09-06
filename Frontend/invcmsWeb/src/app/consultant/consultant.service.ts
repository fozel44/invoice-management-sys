import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultant } from '../domain/consultant';
import { ConsultantApi } from '../app-const/api-gateway';
import { BaseCrudOperationService } from '../base/base-crud-operation.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConsultantService extends BaseCrudOperationService {

  url="/consultant/"
  
  constructor(protected httpClient:HttpClient) {
    super(httpClient);
  }

  getConsultants(companyId: string): Observable<Consultant[]> {
    if (companyId) {
      return this.httpClient.get<Consultant[]>(ConsultantApi.getConsultantListByCompanyId + companyId)

    } else {
      this.getAll(this.url)

    }
  }

  getStavesListByCompanyId(companyId:string):Observable<Consultant[]>{
    return this.httpClient.get<Consultant[]>(ConsultantApi.getStavesListByCompanyId+companyId).pipe(
      map(
        ress =>{
          return ress;
        })
    )
  }

  getConsultantByUserId(id:string){
    return this.httpClient.get<Consultant>(ConsultantApi.getConsultantByUserId+id).pipe(
      map(
        ress =>{
          return ress;
        })
    )
  }

  }//class
