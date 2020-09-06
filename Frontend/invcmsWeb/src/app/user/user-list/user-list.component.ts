import { Component, OnInit } from '@angular/core';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from 'src/app/domain/user';
import { EditUserDialogComponent } from 'src/app/dialogs/edit-user-dialog/edit-user-dialog.component';
import { BaseCrudOperationComponent } from 'src/app/base/base-crud-operation.component';
import { UserService } from '../user.service';
import { RoleGuardService } from 'src/app/service/role-guard.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent extends BaseCrudOperationComponent implements OnInit {

  url = "/user/"

  users
  filterText;

  constructor(
    protected userService: UserService,
    protected formService: FormHandlerService,
    protected dialog: MatDialog,
    private roleGuard:RoleGuardService) {
    super(userService, formService);
  }



  ngOnInit() {
    this.userService.getAll(this.url).subscribe(res => this.users = res)

  }


  editUser(user: User) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      user: user
    }


    this.dialog.open(EditUserDialogComponent, dialogConfig);

  }

}
