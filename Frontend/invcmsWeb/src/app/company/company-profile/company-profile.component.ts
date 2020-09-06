import { Component, OnInit } from '@angular/core';
import { BaseCrudOperationComponent } from 'src/app/base/base-crud-operation.component';
import { CompanyService } from '../company.service';
import { ConsultantService } from 'src/app/consultant/consultant.service';
import { InvoiceService } from 'src/app/invoice/invoice.service';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/domain/company';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditCompanyDialogComponent } from 'src/app/dialogs/edit-company-dialog/edit-company-dialog.component';
import { StorageService } from 'src/app/service/storage.service';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import { SrcPipe } from 'src/app/pipes/file-pipe/src.pipe';
import { SafeUrl } from '@angular/platform-browser';
import { RoleGuardService } from 'src/app/service/role-guard.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.less']
})
export class CompanyProfileComponent extends BaseCrudOperationComponent implements OnInit {
  url = "/company"
  company
  companyId
  invoiceList
  consultantList
  safeUrl:SafeUrl
  isEditEnable=false

  radioValue = "ownerInvoices"
  constructor(
    protected companyService: CompanyService,
    private consultantService: ConsultantService,
    private invoiceService: InvoiceService,
    protected formService: FormHandlerService,
    private activatedRoute: ActivatedRoute,
    protected dialog: MatDialog,
    private storageService: StorageService,
    public roleGuard:RoleGuardService

  ) {
    super(companyService, formService);
  }




  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe().subscribe(params => {
      //Filter ; parametreler içinden companyId'si tanımlı olan parametreleri dönderir.
      this.companyId = params.companyId
    })
    this.companyService.view(this.url, this.companyId).subscribe(res => this.company = res)
    this.consultantService.getStavesListByCompanyId(this.companyId).subscribe(res => this.consultantList = res,
      error=>error,
      ()=>{
        this.isEditEnable = this.roleGuard.isConsultantCompanyOrRoles(this.consultantList,['ADMIN'])
    })
    this.invoiceService.getAllInvoceListByCompanyId(this.companyId).subscribe(res => this.invoiceList = res)
    

  }//oninit







  // func() {
  //   const token = this.storageService.getUser().token['access_token'];
  //   console.log(token)
  //   const fetchOptions = {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + token  // you would, of course, not hard-code this here... 
  //     }
  //   };

  //   const headers = new HttpHeaders({ 'Authorization': `Bearer ` + token })
  //   fetchOptions.headers.Authorization = "Bearer " + token
  //   console.log(fetchOptions.headers.Authorization)


  //   fetch(this.company.logo, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + token  // you would, of course, not hard-code this here... 
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(token)
  //       let image = document.createElement('img');
  //       image.src = `data:${response.mimeType};base64,${response.base64Content}`;
  //       document.body.appendChild(image);
  //     });
  // }



  editCompany(company: Company) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      company: company
    }


    this.dialog.open(EditCompanyDialogComponent, dialogConfig);

  }


}

