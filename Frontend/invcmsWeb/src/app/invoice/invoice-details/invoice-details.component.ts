import { Component, OnInit } from '@angular/core';
import { BaseCrudOperationComponent } from 'src/app/base/base-crud-operation.component';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { InvoiceService } from '../invoice.service';
import { Invoice } from 'src/app/domain/invoice';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { RoleGuardService } from 'src/app/service/role-guard.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditInvoiceDialogComponent } from 'src/app/dialogs/edit-invoice-dialog/edit-invoice-dialog.component';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.less']
})
export class InvoiceDetailsComponent extends BaseCrudOperationComponent implements OnInit {
  invoiceId
  invoice:Invoice
  url="/invoice"
  downloadLink

  constructor(
    protected formService: FormHandlerService,
    protected invoiceService: InvoiceService,
    private activatedRoute:ActivatedRoute,
    public roleGuard:RoleGuardService,
    protected dialog: MatDialog

  ) {
    super(invoiceService, formService);
    this.activatedRoute.queryParams.pipe().subscribe(params => {
      this.invoiceId = params.invoiceId
    })
   
  }

  ngOnInit(): void {
    this.invoiceService.view(this.url,this.invoiceId).subscribe((res:Invoice) => this.invoice=res) 
   


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
