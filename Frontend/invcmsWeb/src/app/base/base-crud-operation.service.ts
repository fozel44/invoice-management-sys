import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_ENDPOINTWITHVERSION } from '../app-const/api-gateway';

export abstract class BaseCrudOperationService {
  baseUrl = API_ENDPOINTWITHVERSION;
crudUrl = {
  addPrepare:"/add-prepare",
  editPrepare:"/edit-prepare/", // id parameter
  add:"/add", // AddDto
  edit:"/edit", // EditDto
  view:"/view/", // id parameter
  getAll:"get-all/",
  activate:"/activate/", // id parameter
  deactivate:"/deactivate/", // id parameter
  trash:"/trash/" // id parameter

}





constructor(protected httpClient: HttpClient) { }


async addPrepare2(url: string) {
  const result=  await this.httpClient.get(this.baseUrl + url +this.crudUrl.addPrepare).toPromise()
  return result
};

addPrepare(url: string) {
  return this.httpClient.get(this.baseUrl + url +this.crudUrl.addPrepare).pipe(
    map(
      ress =>{
        return ress;
      })
  )
};

editPrepare(url:string ,id:string) {
  return this.httpClient.get(this.baseUrl  + url + this.crudUrl.editPrepare+ id ).pipe(
    map(
      ress =>{
        return ress;
      })
  )
}

add( url: string, modelDto:any) {
  return this.httpClient.post(this.baseUrl + url + this.crudUrl.add ,modelDto).pipe(
    map(
      ress =>{
        return ress;
      })
  )
}

edit( url: string, modelDto:any) {
  return this.httpClient.post(this.baseUrl + url + this.crudUrl.edit ,modelDto).pipe(
    map(
      ress =>{
        return ress;
      })
  )};

view(url: string,id:string) {
  return this.httpClient.get(this.baseUrl + url + this.crudUrl.view+ id ).pipe(
    map(
      ress =>{
        return ress;
      })
  )
};

activate(url: string,id:string) {
  return this.httpClient.get(this.baseUrl + url + this.crudUrl.activate+ id).pipe(
    map(
      ress =>{
        return ress;
      })
  ) };

deactivate(url: string,id:string) {
  return this.httpClient.get(this.baseUrl + url + this.crudUrl.deactivate+ id).pipe(
    map(
      ress =>{
        return ress;
      })
  )
};

trash(url: string,id:string) {
  return this.httpClient.get(this.baseUrl + url + this.crudUrl.trash+ id ).pipe(
    map(
      ress =>{
        return ress;
      })
  )
};

getAll(url:string){
  return this.httpClient.get<Object[]>(this.baseUrl+url+this.crudUrl.getAll).pipe(
    map(
      ress =>{
        return ress
      }
    )
  )
}

}