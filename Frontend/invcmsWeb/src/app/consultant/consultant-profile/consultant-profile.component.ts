import { Component, OnInit } from '@angular/core';
import { Consultant } from 'src/app/domain/consultant';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { ConsultantService } from '../consultant.service';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/domain/invoice';
import { NzTooltipBaseComponent } from 'ng-zorro-antd/tooltip';
import { BaseCrudOperationComponent } from 'src/app/base/base-crud-operation.component';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserApi } from 'src/app/app-const/api-gateway';
import { User } from 'src/app/domain/user';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditConsultantDialogComponent } from 'src/app/dialogs/edit-consultant-dialog/edit-consultant-dialog.component';
import { StorageService } from 'src/app/service/storage.service';
import { RoleGuardService } from 'src/app/service/role-guard.service';


@Component({
  selector: 'app-consultant-profile',
  templateUrl: './consultant-profile.component.html',
  styleUrls: ['./consultant-profile.component.less']
})
export class ConsultantProfileComponent extends BaseCrudOperationComponent implements OnInit {

  consultantId
  consultant
  url = "/consultant"
  PayoutEnabled
  editEnable
  userId: any;
  isUser: any;


  radioValue = "ownerInvoices"
  
  constructor(
    protected formService: FormHandlerService,
    protected consultantService: ConsultantService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private storageService: StorageService,
    private roleGuard:RoleGuardService
  ) {
    super(consultantService, formService);


  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe().subscribe(params => {
      //Filter ; parametreler içinden companyId'si tanımlı olan parametreleri dönderir.
      this.consultantId = params.consultantId
      this.userId=params.userId
      this.isUser=params.user
    })
    if(this.consultantId){ 
    this.consultantService.view(this.url, this.consultantId).subscribe(res =>{ this.consultant = res},
      error=>error,
      ()=>{this.editEnable=this.roleGuard.isUserOrRoles(this.consultant.user,["ADMIN"])
      
      }
      );}
       
      if(this.userId&&this.isUser){
        this.consultantService.getConsultantByUserId(this.userId).subscribe(res =>{ this.consultant = res},
          error=>error,
          ()=>{this.editEnable=this.roleGuard.isUserOrRoles(this.consultant.user,["ADMIN"])
          
          }
          );

      }

    
  }
  
  
  

  // isEditEnable() {
  //   let currentUser = this.storageService.getUser()
  //   console.log(currentUser)
  //   // this.httpClient.get(UserApi.getCurrentUser).pipe(map((res:User)=> {return currentUser=res}))

  //   // if(currentUser.id&&((currentUser.id!=this.consultant.user.id)|| (currentUser.roles.map(res => res.name).indexOf("ROLE_ADMIN") === -1))){
  //   //   console.log(currentUser)
  //   //   return false
  //   // }else return true
  //   if ( this.consultant && (currentUser.id.indexOf(this.consultant.user.id) !== -1 || (currentUser.roles.map(res => res.name).indexOf("ROLE_ADMIN") !== -1))) {
  //     this.editEnable =  true
  //   } else  this.editEnable = false
  // }

  editConsultant(consultant: Consultant) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      consultant: consultant
    }


    this.dialog.open(EditConsultantDialogComponent, dialogConfig);

  }


}

