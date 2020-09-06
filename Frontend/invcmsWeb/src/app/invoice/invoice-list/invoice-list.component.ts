import { Component, OnInit, Input } from '@angular/core';
import { BaseCrudOperationComponent } from 'src/app/base/base-crud-operation.component';
import { Invoice } from 'src/app/domain/invoice';
import { Consultant } from 'src/app/domain/consultant';
import { InvoiceService } from '../invoice.service';
import { ConsultantService } from 'src/app/consultant/consultant.service';
import { ActivatedRoute } from '@angular/router';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import {
  Observable, Subject, asapScheduler, pipe, of, from,
  interval, merge, fromEvent
} from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditInvoiceDialogComponent } from 'src/app/dialogs/edit-invoice-dialog/edit-invoice-dialog.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.less']
})
export class InvoiceListComponent extends BaseCrudOperationComponent implements OnInit {
  url = "/invoice/"
  filterText
  invoices
  consultants
  consultantsDto
 
  @Input() consultantId: string;
  @Input() companyId: string;
  @Input() allInvoiceListByConsultantId: boolean;
  @Input() ownerCompanyId: string;
  @Input() remoteCompanyId: string;
  @Input() ownerInvoiceListByConsultantId: boolean;
  @Input() remoteInvoiceListByConsultantId: boolean;
  @Input() allInvoiceListByCompanyId: boolean;
  @Input() ownerInvoiceListByCompanyId: boolean;
  @Input() remoteInvoiceListByCompanyId: boolean;
  @Input() filteredInvoiceListByCompanies: boolean;
  @Input() filteredInvoiceListByCompaniesAndConsultantId: boolean;
  @Input() doNotListConsultants: boolean = false;

  constructor(private invoiceService: InvoiceService,
    private consultantService: ConsultantService,
    private activatedRoute: ActivatedRoute,
    protected formService: FormHandlerService,
    protected dialog: MatDialog
  ) {
    super(invoiceService, formService);
    this.consultantService.getAll("/consultant/").subscribe(data => {
      this.consultants = data
    })
    
    this.activatedRoute.queryParams.pipe().subscribe(params => {
      //Filter ; parametreler içinden companyId'si tanımlı olan parametreleri dönderir.
      this.consultantId = params.consultantId
      this.companyId = params.companyId
      this.allInvoiceListByConsultantId = params.allInvoiceListByConsultantId
      this.ownerCompanyId = params.ownerCompanyId
      this.remoteCompanyId = params.remoteCompanyId
      this.ownerInvoiceListByConsultantId = params.ownerInvoiceListByConsultantId
      this.remoteInvoiceListByConsultantId = params.remoteInvoiceListByConsultantId
      this.allInvoiceListByCompanyId = params.allInvoiceListByCompanyId
      this.ownerInvoiceListByCompanyId = params.ownerInvoiceListByCompanyId
      this.remoteInvoiceListByCompanyId = params.remoteInvoiceListByCompanyId
      this.filteredInvoiceListByCompanies = params.filteredInvoiceListByCompanies
      this.filteredInvoiceListByCompaniesAndConsultantId = params.filteredInvoiceListByCompaniesAndConsultantId
      this.doNotListConsultants = params.doNotListConsultants
    }
    );

  }

  ngOnInit() {
    
    if (this.consultantId && this.ownerInvoiceListByConsultantId) {
      this.invoiceService.getOwnerInvoiceListByConsultantId(this.consultantId).subscribe(data =>
        this.invoices = data
      )
    }

    else if (this.consultantId && this.allInvoiceListByConsultantId) {
      this.invoiceService.getAllInvoceListByConsultantId(this.consultantId).subscribe(data =>
        this.invoices = data
      )
    }

    else if (this.consultantId && this.remoteInvoiceListByConsultantId) {
      this.invoiceService.getRemoteInvoiceListByConsultantId(this.consultantId).subscribe(data =>
        this.invoices = data
      )
    }

    else if (this.companyId && this.allInvoiceListByCompanyId) {
      this.invoiceService.getAllInvoceListByCompanyId(this.companyId).subscribe(data =>
        this.invoices = data
      )
    }

    else if (this.companyId && this.ownerInvoiceListByCompanyId) {
      this.invoiceService.getOwnerInvoiceListByCompanyId(this.companyId).subscribe(data =>
        this.invoices = data
      )
    }

    else if (this.companyId && this.remoteInvoiceListByCompanyId) {
      this.invoiceService.getRemoteInvoiceListByCompanyId(this.companyId).subscribe(data =>
        this.invoices = data
      )
    }

    else if (this.ownerCompanyId && this.remoteCompanyId && this.filteredInvoiceListByCompanies) {
      this.invoiceService.getFilteredInvoiceListByCompanies(this.ownerCompanyId, this.remoteCompanyId).subscribe(data =>
        this.invoices = data
      )
    }

    else if (this.ownerCompanyId && this.remoteCompanyId && this.filteredInvoiceListByCompaniesAndConsultantId && this.consultantId) {
      this.invoiceService.getFilteredInvoiceListByCompaniesAndConsultantId(this.ownerCompanyId, this.remoteCompanyId, this.consultantId).subscribe(data =>
        this.invoices = data
      )
    }
    else {
      this.invoiceService.getAll(this.url).subscribe(res => this.invoices = res)
    }
    
  }



  getConsultants() {
    
  }

  getInvoices(consultantId) {
    this.invoiceService.getInvoices(consultantId).subscribe(data => {
      this.invoices = data
    }

    )
  }

  editInvoice(invoice: Invoice) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      invoice: invoice
    }


    this.dialog.open(EditInvoiceDialogComponent, dialogConfig);

  }

}

