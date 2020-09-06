import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddConsultantDialogComponent } from '../add-consultant-dialog/add-consultant-dialog.component';
import { RoleService } from 'src/app/role/role.service';
import { UserService } from 'src/app/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ValidationErrors, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { FormHandlerService } from 'src/app/service/form-handler.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.less']
})
export class AddUserDialogComponent implements OnInit {


  addUserForm:FormGroup;
  roleList;
  selectedRoles;
  url: string = "/user"


  constructor(
    private dialogRef: MatDialogRef<AddConsultantDialogComponent>,
    private roleService: RoleService,
    private userService: UserService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private formService: FormHandlerService
  ) { 

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


  generateForm(){
    this.addUserForm = this.fb.group({
        firstName:    ["", Validators.required],
        lastName:     ["", Validators.required],
        email:        ["", [Validators.required,Validators.email]],
        password:     ["", Validators.required],
        confirmPass:  ["",this.matchValues('password')],
        roles:        [[],Validators.required]
    });

  }


  ngOnInit(): void {

    this.roleService.getAll("/role/").subscribe(res => this.roleList = res)
    //this.consultantService.addPrepare(this.url).subscribe(res => {this.addConsultantForm = this.formService.entityToForm(res)})
    this.generateForm()
    
    if(this.addUserForm != undefined &&this.addUserForm.value.password!=""){

      this.addUserForm.controls.password.valueChanges.subscribe(() => {
        this.addUserForm.controls.confirmPassword.updateValueAndValidity();
      });
    }

  }


  save() {
    let newUser = {}
    
    let formDto = this.formService.formToEntity(this.addUserForm.value, newUser)
    return this.userService.add(this.url, formDto).subscribe(
      res => {

        this.toastrService.success("User added succcess.", "Successfully")
        this.close()
        location.reload();
      },
      error => {
        this.toastrService.error("There was a problem adding the user.", "!Oops")
      }
    )

  }

  close() {
    this.dialogRef.close();
  }





}
