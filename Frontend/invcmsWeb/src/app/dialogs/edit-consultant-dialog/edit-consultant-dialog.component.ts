import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConsultantService } from 'src/app/consultant/consultant.service';
import { Router } from '@angular/router';
import { Consultant } from 'src/app/domain/consultant';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { CompanyService } from 'src/app/company/company.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { RoleGuardService } from 'src/app/service/role-guard.service';

@Component({
    selector: 'app-edit-consultant-dialog',
    templateUrl: './edit-consultant-dialog.component.html',
    styleUrls: ['./edit-consultant-dialog.component.less']
})
export class EditConsultantDialogComponent implements OnInit {
    url="/consultant"
    editConsultantForm: FormGroup;
    companyList
    consultant:Consultant
    selectedWorked
    selectedOwned
    editDto
    sifreDegissinMi;
    currentPassword
    newPassword
    confirmPass

    separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.Turkey, CountryISO.Azerbaijan];
    fileDownloadUri
    item
    isPulled=false

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditConsultantDialogComponent>,
        private toastrService: ToastrService,
        private consultantService: ConsultantService,
        private formService:FormHandlerService,
        private companyService:CompanyService,
        private roleGuard:RoleGuardService,
        @Inject(MAT_DIALOG_DATA) data) {

        this.consultant=data.consultant   
        this.consultantService.editPrepare(this.url,this.consultant.id).subscribe(res =>  {this.editDto=res} )
        
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
        this.editConsultantForm = this.fb.group({
            id:                 [this.editDto.id],
            userId:             [this.editDto.userId],
            firstName:          [this.editDto.firstName, Validators.required],
            lastName:           [this.editDto.lastName, Validators.required],
            email:              [this.editDto.email, Validators.required],
            currentPassword:    [undefined],
            password:           [undefined],
            confirmPass:        [undefined,this.matchValues('password')],
            phone:              [this.editDto.phone, Validators.required],
            photo:              [this.editDto.photo],
            address:            [this.editDto.address, Validators.required],
            ownedCompany:       [this.editDto.ownedCompany, Validators.required],
            workedCompany:      [this.editDto.workedCompany, Validators.required]
        });
        
    }

    ngOnInit() {
        this.selectedOwned=this.consultant.ownedCompany
        this.selectedWorked=this.consultant.workedCompany
        this.companyService.getAll("/company/").subscribe(res => {this.companyList = res},error=>{error }, ()=>{if(this.editDto)this.generateForm()})
        

        if(this.editConsultantForm != undefined && this.editConsultantForm.value.password != undefined  ){

            this.editConsultantForm.controls.password.valueChanges.subscribe(() => {
              this.editConsultantForm.controls.confirmPassword.updateValueAndValidity();
            });
          }
        //this.editConsultantForm= this.formService.entityToForm(res)
    }


    eventCheck(check){
        return this.sifreDegissinMi = check;
    }

    addItem(newItem) {
        this.item = newItem;
        this.isPulled = true
        this.fileDownloadUri = this.item.fileDownloadUri
      }
    
      appendFormImg() {
        this.editConsultantForm.value.photo = this.fileDownloadUri
      }

    save() {
        if(this.fileDownloadUri)this.appendFormImg()
        return this.consultantService.edit(this.url,this.editConsultantForm.value).subscribe(
            res => {
                this.toastrService.success("Consultant edited succcess.", "Successfully")
                this.close()
                location.reload();
            },
            error => {
                this.toastrService.error("There was a problem editing the consultant.", "!Oops")
            }
        )

    }

    close() {
        this.dialogRef.close();
    }

}

