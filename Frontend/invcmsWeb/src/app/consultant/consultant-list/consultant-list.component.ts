import { Component, OnInit } from '@angular/core';
import { Consultant } from 'src/app/domain/consultant';
import { ConsultantService } from '../consultant.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditConsultantDialogComponent } from 'src/app/dialogs/edit-consultant-dialog/edit-consultant-dialog.component';
import { AddConsultantDialogComponent } from 'src/app/dialogs/add-consultant-dialog/add-consultant-dialog.component';
import { BaseCrudOperationComponent } from 'src/app/base/base-crud-operation.component';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { RoleGuardService } from 'src/app/service/role-guard.service';



@Component({
  selector: 'app-consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.less']
})
export class ConsultantListComponent extends BaseCrudOperationComponent implements OnInit {
  consultants
  url="/consultant/"
  filterText
  constructor(protected consultantService:ConsultantService,
              private dialog: MatDialog,
              protected formService: FormHandlerService,
              private roleGuard:RoleGuardService
              ) {
    super(consultantService,formService);

  }

  ngOnInit() {
    this.consultantService.getAll(this.url).subscribe(res=> this.consultants=res)
    
  
  
  }

  // getConsultants(){
  //   this.getAll()
  //   this.consultants=this.entityList
  // }

   
  
  editConsultant(consultant:Consultant) {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data={  
      consultant : consultant
  }
   
  
    this.dialog.open(EditConsultantDialogComponent, dialogConfig);
    
}
  
 
  

    
    
  } //class
