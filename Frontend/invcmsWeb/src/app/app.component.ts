import { Component } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddConsultantDialogComponent } from './dialogs/add-consultant-dialog/add-consultant-dialog.component';
import { StorageService } from './service/storage.service';
import { Role } from './domain/role';
import { AddInvoiceDialogComponent } from './dialogs/add-invoice-dialog/add-invoice-dialog.component';
import { AddCompanyDialogComponent } from './dialogs/add-company-dialog/add-company-dialog.component';
import { AuthenticationService } from './service/authentication.service';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { RoleGuardService } from './service/role-guard.service';
import { ConsultantService } from './consultant/consultant.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'web';
  isCollapsed = false;
  isLoggedin;
  isAdmin
  isConsultant
  isUser
  user
  constructor(
    private dialog: MatDialog,
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private roleGuard: RoleGuardService

  ) {
  
  }
  
  

  isLoggedIn() {
    this.authenticationService.isLoggedIn.subscribe(data => {
      this.isLoggedin = data
    }
    )
    return this.isLoggedin
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


  addConsultant() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;



    this.dialog.open(AddConsultantDialogComponent, dialogConfig)


  }

  addInvoice() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;



    this.dialog.open(AddInvoiceDialogComponent, dialogConfig)


  }



  addUser() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;



    this.dialog.open(AddUserDialogComponent, dialogConfig)


  }


  addCompany() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddCompanyDialogComponent, dialogConfig)


  }

}//class
