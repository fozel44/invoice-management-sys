import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConsultantService } from 'src/app/consultant/consultant.service';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { CompanyService } from 'src/app/company/company.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-add-consultant-dialog',
  templateUrl: './add-consultant-dialog.component.html',
  styleUrls: ['./add-consultant-dialog.component.less']
})
export class AddConsultantDialogComponent implements OnInit {

  addConsultantForm: FormGroup;
  url: string = "/consultant"
  companyList;
  selectedOwned = null
  selectedWorked = null

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.Turkey, CountryISO.Azerbaijan];
	
  constructor(
    private dialogRef: MatDialogRef<AddConsultantDialogComponent>,
    private consultantService: ConsultantService,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private formService: FormHandlerService

  ) {


  }

  formImgdto
  fileDownloadUri
  item
  isPulled = false

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
    this.addConsultantForm = this.fb.group({
        firstName:    ["", Validators.required],
        lastName:     ["", Validators.required],
        email:        ["", [Validators.required,Validators.email]],
        identityNo:   ["", Validators.required],
        password:     ["", Validators.required],
        confirmPass:  ["",[Validators.required,this.matchValues('password')]],
        phone:        ["", Validators.required],
        address:      ["", Validators.required],
        photo:        [""],
        ownedCompany: [undefined, Validators.required],
        workedCompany:[undefined, Validators.required]
    });

  }

  
  ngOnInit() {
    this.companyService.getAll("/company/").subscribe(res => this.companyList = res)
    //this.consultantService.addPrepare(this.url).subscribe(res => {this.addConsultantForm = this.formService.entityToForm(res)})
    this.generateForm()
    if(this.addConsultantForm.value.password!=''){

      this.addConsultantForm.controls.password.valueChanges.subscribe(() => {
        this.addConsultantForm.controls.confirmPassword.updateValueAndValidity();
      });
    }
  

  




  }



  addItem(newItem: any) {
    this.item = newItem;
    this.isPulled = true
    this.fileDownloadUri = this.item.fileDownloadUri
  }

  appendFormImg() {
    this.addConsultantForm.value.photo = this.fileDownloadUri
  }

  appendFormPhone(){
    //this.addConsultantForm.value.phone=this.phoneForm.value.phone
  }



  save() {
    console.log(this.addConsultantForm.value)
    let newConsultant = {}
    this.appendFormImg();
    let formDto = this.formService.formToEntity(this.addConsultantForm.value, newConsultant)
    return this.consultantService.add(this.url, formDto).subscribe(
      res => {

        this.toastrService.success("Consultant added succcess.", "Successfully")
        this.close()
        location.reload();
      },
      error => {
        this.toastrService.error("There was a problem adding the consultant.", "!Oops")
      }
    )

  }

  close() {
    this.dialogRef.close();
  }


}
