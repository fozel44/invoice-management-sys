import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl, RequiredValidator } from '@angular/forms';
import { Consultant } from 'src/app/domain/consultant';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditConsultantDialogComponent } from '../edit-consultant-dialog/edit-consultant-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConsultantService } from 'src/app/consultant/consultant.service';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/domain/company';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-edit-company-dialog',
  templateUrl: './edit-company-dialog.component.html',
  styleUrls: ['./edit-company-dialog.component.less']
})
export class EditCompanyDialogComponent implements OnInit {

  url = "/company"
  editCompanyForm: FormGroup;
  company: Company
  editDto

  formImgdto
  fileDownloadUri
  item
  isPulled = false

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.Turkey, CountryISO.Azerbaijan];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditConsultantDialogComponent>,
    private toastrService: ToastrService,
    private formService: FormHandlerService,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) data) {

    this.company = data.company
    //this.companyService.editPrepare(this.url, this.company.id).subscribe(res => this.editCompanyForm=this.formService.entityToForm(res))
    this.companyService.editPrepare(this.url,this.company.id).subscribe(res =>  {this.editDto=res},
      error=>error,
      ()=>{
        if(this.editDto){
          this.generateForm()}
      }  )
    
  }

  generateForm(){
    this.editCompanyForm = this.fb.group({
        id:                     [this.editDto.id],
        name:                   [this.editDto.name,Validators.required],
        taxIdentificationNumber:[this.editDto.taxIdentificationNumber, Validators.required],
        taxOffice:              [this.editDto.taxOffice, Validators.required],
        phone:                  [this.editDto.phone],
        address:                [this.editDto.address, Validators.required],
        description:            [this.editDto.description, Validators.required],
        logo:                   [this.editDto.logo]
    });
    
}

  ngOnInit() {
    //this.companyService.editPrepare(this.url, this.company.id).subscribe(res => this.editCompanyForm=this.formService.entityToForm(res))
    
  }

  addItem(newItem: any) {
    this.item=newItem;
    this.isPulled=true
    console.log("this.item : "+this.item)
    this.fileDownloadUri=this.item.fileDownloadUri
    console.log("fileDownloadUri "+this.fileDownloadUri)
  }

  appendFormImg() {
    this.editCompanyForm.value.logo = this.fileDownloadUri
  }

  save() {
    if(this.fileDownloadUri)this.appendFormImg()
    console.log(this.editCompanyForm.value)
    return this.companyService.edit(this.url, this.editCompanyForm.value).subscribe(
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


