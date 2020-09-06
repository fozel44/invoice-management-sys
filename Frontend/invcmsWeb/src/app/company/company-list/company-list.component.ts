import { Component, OnInit } from '@angular/core';
import { BaseCrudOperationComponent } from 'src/app/base/base-crud-operation.component';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompanyService } from '../company.service';
import { Company } from 'src/app/domain/company';
import { EditCompanyDialogComponent } from 'src/app/dialogs/edit-company-dialog/edit-company-dialog.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.less']
})
export class CompanyListComponent extends BaseCrudOperationComponent implements OnInit {

  url = "/company/"

  companies
  filterText;

  constructor(
    protected companyService: CompanyService,
    protected formService: FormHandlerService,
    protected dialog: MatDialog) {
    super(companyService, formService);
  }



  ngOnInit() {
    this.companyService.getAll(this.url).subscribe(res => this.companies = res)

  }


  editCompany(company: Company) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      company: company
    }


    this.dialog.open(EditCompanyDialogComponent, dialogConfig);

  }




  // addInvoice(ownerCompany: Company, remoteCompany: Company, consultant?: Consultant) {

  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   if (consultant) {
  //     dialogConfig.data = {

  //       consultant: consultant,
  //       ownerCompany: ownerCompany,
  //       remoteCompany: remoteCompany
  //     };

  //   } else {
  //     dialogConfig.data = {

  //       ownerCompany: ownerCompany,
  //       remoteCompany: remoteCompany
  //     };
  //   }

  //   this.dialog.open(AddInvoiceDialogComponent, dialogConfig)


  // }


}//class

