import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditConsultantDialogComponent } from '../edit-consultant-dialog/edit-consultant-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConsultantService } from 'src/app/consultant/consultant.service';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { CompanyService } from 'src/app/company/company.service';
import { UserService } from 'src/app/user/user.service';
import { RoleService } from 'src/app/role/role.service';
import { RoleGuardService } from 'src/app/service/role-guard.service';
import { delay } from 'rxjs/operators';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.less']
})
export class EditUserDialogComponent implements OnInit {

  url="/user"
  editDto
  user
  editUserForm:FormGroup
  sifreDegissinMi
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private toastrService: ToastrService,
    private userService: UserService,
    private formService:FormHandlerService,
    private roleService:RoleService,
    private roleGuard:RoleGuardService,

    @Inject(MAT_DIALOG_DATA) data) {

    this.user=data.user 
    this.userService.editPrepare(this.url,this.user.id).subscribe(res =>  {this.editDto=res},
        error=>error,
        ()=>{
          this.generateForm()
        }  )
    
}
 
  generateForm(){
    this.editUserForm = this.fb.group({
        id:           [this.editDto.id],
        firstName:    [this.editDto.firstName, Validators.required],
        lastName:     [this.editDto.lastName, Validators.required],
        email:        [this.editDto.email, [Validators.required,Validators.email]],
        currentPassword:[""],
        password:     [""],
        confirmPass:  ["",this.matchValues('password')],
        roles:        [this.editDto.roles,Validators.required]
    });

  }

  public  matchValues(
    matchTo: string
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  ngOnInit(): void {
    if(this.editUserForm != undefined && this.editUserForm.value.password != undefined  ){

      this.editUserForm.controls.password.valueChanges.subscribe(() => {
        this.editUserForm.controls.confirmPassword.updateValueAndValidity();
      });
    }
  }

  eventCheck(check){
    return this.sifreDegissinMi = check;
}

save() {
        
  return this.userService.edit(this.url,this.editUserForm.value).subscribe(
        res => {
        this.toastrService.success("User edited succcess.", "Successfully")
        this.close()
        location.reload();
      },
      error => {
          this.toastrService.error("There was a problem editing the user.", "!Oops")
      }
  )

}

close() {
  this.dialogRef.close();
}


}
