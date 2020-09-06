import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ConsultantApi } from '../app-const/api-gateway';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConsultantService } from '../consultant/consultant.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  editEnable: boolean


  constructor(
    private storageService: StorageService,
    private httpClient: HttpClient,
    private consultantService: ConsultantService
  ) {




  }

  isConsultantCompanyOrRoles(consultantList, roles) {
    let currentUser = this.storageService.getUser()
  
    if (consultantList && (this.doRolesMatch(roles) || consultantList.map(consultant => consultant.user.id.indexOf(currentUser.id) !== -1).find(val => val == true))) {
          return true
        } else return false
      
  }

  async isConsultantCompanyOrRoles2(company) {

    const result = await this.consultantService.getStavesListByCompanyId(company.id).toPromise()
    return result
  }



  isUserOrRoles(user, roles: string[]) {
    let currentUser = this.storageService.getUser()
    if (user && (currentUser.id.indexOf(user.id) !== -1 || this.doRolesMatch(roles))) {
      return true
    } else return false
  }



  doRolesMatch(roleNames: string[]): boolean {
    let roleNamesAddedPrefix: string[] = []
    for (let roleName of roleNames) {
      roleName = "ROLE_" + roleName
      roleNamesAddedPrefix.push(roleName)
    }
    for (let r of this.storageService.getUser().roles) {
      if (roleNamesAddedPrefix.indexOf(r.name) === -1) {
        return false
      }
      else {
        return true
      }
    }
  }

}
