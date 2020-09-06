import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Invoice } from 'src/app/domain/invoice';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/invoice/invoice.service';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { CompanyService } from 'src/app/company/company.service';
import { ConsultantService } from 'src/app/consultant/consultant.service';

@Component({
  selector: 'app-edit-invoice-dialog',
  templateUrl: './edit-invoice-dialog.component.html',
  styleUrls: ['./edit-invoice-dialog.component.less']
})
export class EditInvoiceDialogComponent implements OnInit {

  url = "/invoice"
  editInvoiceForm: FormGroup;
  companyList
  months: string[] = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
  consultantList
  invoice: Invoice
  selectedRemote
  selectedOwner
  selectedConsultant
  selectedMonth
  selectedYear
  editDto
  timesheet
  pdf
  years = function (startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  }
  isPulledTimesheet: boolean;
  timesheetFileDownloadUri: any;
  isPulledPdf: boolean;
  pdfFileDownloadUri: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditInvoiceDialogComponent>,
    private toastrService: ToastrService,
    private invoiceService: InvoiceService,
    private formService: FormHandlerService,
    private companyService: CompanyService,
    private consultantService: ConsultantService,
    @Inject(MAT_DIALOG_DATA) data) {

    this.invoice = data.invoice
    this.invoiceService.editPrepare(this.url, this.invoice.id).subscribe(res => this.editDto = res)

  }

  generateForm() {
    this.editInvoiceForm = this.fb.group({
      id: [this.editDto.id],
      month: [this.editDto.month, Validators.required],
      year: [this.editDto.year, Validators.required],
      amount: [this.editDto.amount, Validators.required],
      consultant: [this.editDto.consultant, Validators.required],
      ownerCompany: [this.editDto.ownerCompany, Validators.required],
      remoteCompany: [this.editDto.remoteCompany, Validators.required],
    });

  }

  ngOnInit() {
    this.selectedYear=this.invoice.year
    this.selectedOwner = this.invoice.ownerCompany
    this.selectedRemote = this.invoice.remoteCompany
    this.selectedConsultant = this.invoice.consultant
    this.selectedMonth=this.invoice.month
    
    this.companyService.getAll("/company/").subscribe(res => { this.companyList = res }, error => { error }, () => { this.generateForm() })
    this.consultantService.getAll("/consultant/").subscribe(res => this.consultantList = res)
    //this.editConsultantForm= this.formService.entityToForm(res)
  }

  addTimesheet(newTimesheet: any) {
    this.timesheet = newTimesheet;
    this.isPulledTimesheet = true
    this.timesheetFileDownloadUri = this.timesheet.fileDownloadUri
}
appendFormTimesheet(){
    this.editInvoiceForm.value.timesheet=this.timesheetFileDownloadUri
  }
addPdf(newPdf: any) {
    this.pdf = newPdf;
    this.isPulledPdf = true
    this.pdfFileDownloadUri = this.pdf.fileDownloadUri
}
appendFormPdf(){
    this.editInvoiceForm.value.pdf=this.pdfFileDownloadUri
  }

  save() {
    this.appendFormPdf()
    this.appendFormTimesheet()
    return this.consultantService.edit(this.url, this.editInvoiceForm.value).subscribe(
      res => {
        this.toastrService.success("Invoice edited succcess.", "Successfully")
        this.close()
        location.reload();
      },
      error => {
        this.toastrService.error("There was a problem editing the invoice.", "!Oops")
      }
    )

  }

  close() {
    this.dialogRef.close();
  }

}

