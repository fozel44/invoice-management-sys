import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/domain/invoice';
import { InvoiceApi } from '../app-const/api-gateway';
import { BaseCrudOperationService } from '../base/base-crud-operation.service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseCrudOperationService {

   url="/invoice/"


  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }


  getInvoices(consultantId: string): Observable<Invoice[]> | Observable<Object[]> {
    if (consultantId) {
      return this.httpClient.get<Invoice[]>(InvoiceApi.getInvoiceListByConsultantId + consultantId)

    } else {
      return this.getAll(this.url)


    }
  }

  getAllInvoceListByConsultantId(consultantId:string){
    return this.httpClient.get<Invoice[]>(InvoiceApi.getInvoiceListByConsultantId+consultantId)
  }

  getOwnerInvoiceListByConsultantId(consultantId:string): Observable<Invoice[]>{
    return this.httpClient.get<Invoice[]>(InvoiceApi.getOwnerInvoiceListByConsultantId+consultantId)
  }

  getRemoteInvoiceListByConsultantId(consultantId:string){
    return this.httpClient.get<Invoice[]>(InvoiceApi.getRemoteInvoiceListByConsultantId+consultantId)
  }

  getAllInvoceListByCompanyId(companyId:string){
    return this.httpClient.get<Invoice[]>(InvoiceApi.getInvoiceListByCompanyId+companyId)
  }

  getOwnerInvoiceListByCompanyId(companyId:string){
    return this.httpClient.get<Invoice[]>(InvoiceApi.getOwnerInvoiceListByCompanyId+companyId)
  }

  getRemoteInvoiceListByCompanyId(companyId:string){
    return this.httpClient.get<Invoice[]>(InvoiceApi.getRemoteInvoiceListByCompanyId+companyId)
  }
  
  getFilteredInvoiceListByCompanies(ownerCompanyId,remoteCompanyId){
    return this.httpClient.get<Invoice[]>(InvoiceApi.getFilteredInvoiceListByCompanies+ownerCompanyId+"/"+remoteCompanyId)
  }

  getFilteredInvoiceListByCompaniesAndConsultantId(ownerCompanyId,remoteCompanyId,consultantId){
    return this.httpClient.get<Invoice[]>(InvoiceApi.getFilteredInvoiceListByCompaniesandConsultantid+ownerCompanyId+"/"+remoteCompanyId+"/"+consultantId)

  }
}//class