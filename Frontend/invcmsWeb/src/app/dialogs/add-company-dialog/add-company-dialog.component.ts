import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/company/company.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { filter } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';



@Component({
  selector: 'app-add-company-dialog',
  templateUrl: './add-company-dialog.component.html',
  styleUrls: ['./add-company-dialog.component.less']
})
export class AddCompanyDialogComponent  implements OnInit {
  url="/company"
  addCompanyForm: FormGroup;  

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.Turkey, CountryISO.Azerbaijan];

  constructor(
    private dialogRef: MatDialogRef<AddCompanyDialogComponent>,
    private companyService: CompanyService,
    private toastrService: ToastrService,
    private formService: FormHandlerService,
    private fb:FormBuilder,
    private httpClient:HttpClient

  ) {

  }
  fileDownloadUri
  item
  isPulled=false
  ngOnInit() {
    //this.companyService.addPrepare2(this.url).then((res) => this.addCompanyForm= this.formService.entityToForm(res))
    this.generateForm()
  }

  generateForm(){
    this.addCompanyForm = this.fb.group({
        name:                    ["", Validators.required],
        taxIdentificationNumber: ["", Validators.required],
        taxOffice:               ["", Validators.required],
        logo:                    [""],
        description:             ["", Validators.required],
        phone:                   [undefined, Validators.required],
        address:                 ["", Validators.required],
    });
    
}

  addItem(newItem: any) {
    this.item=newItem;
    this.isPulled=true
    console.log("this.item : "+this.item)
    this.fileDownloadUri=this.item.fileDownloadUri
    console.log("fileDownloadUri "+this.fileDownloadUri)
  }

  appendFormImg(){
    this.addCompanyForm.value.logo=this.fileDownloadUri
  }

  save() {
    let newCompany={}
    this.appendFormImg()
    console.log(this.addCompanyForm.value)
    newCompany = this.formService.formToEntity(this.addCompanyForm.value, newCompany);
    return this.companyService.add(this.url,newCompany).subscribe(
      res => {
        this.toastrService.success("Company added succcess.", "Successfully")
        this.close()
        location.reload();
      },
      error => {
        this.toastrService.error("There was a problem adding the company.", "!Oops")
      }
    )

  }

  close() {
    this.dialogRef.close();
  }


  

}
