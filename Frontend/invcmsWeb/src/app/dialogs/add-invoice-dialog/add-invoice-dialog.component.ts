import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators } from '@angular/forms';
import { Consultant } from 'src/app/domain/consultant';
import { ToastrService } from 'ngx-toastr';
import { FormHandlerService } from 'src/app/service/form-handler.service';
import { InvoiceService } from 'src/app/invoice/invoice.service';
import { Company } from 'src/app/domain/company';
import { ConsultantService } from 'src/app/consultant/consultant.service';
import { CompanyService } from 'src/app/company/company.service';
@Component({
    selector: 'app-add-invoice-dialog',
    templateUrl: './add-invoice-dialog.component.html',
    styleUrls: ['./add-invoice-dialog.component.less']
})
export class AddInvoiceDialogComponent implements OnInit {
    url = "/invoice"
    addInvoiceForm: FormGroup;
    consultantList
    companyList
    months: string[] = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
    consultant: Consultant = null
    ownerCompany: Company
    remoteCompany: Company
    selectedOwner
    selectedRemote
    selectedConsultant
    selectedMonth

    years = function (startYear) {
        var currentYear = new Date().getFullYear(), years = [];
        startYear = startYear || 1980;
        while (startYear <= currentYear) {
            years.push(startYear++);
        }
        return years;
    }

    formPdfDto
    pdfFileDownloadUri
    timesheetFileDownloadUri
    pdf
    timesheet
    isPulledPdf = false
    isPulledTimesheet = false
    turumu: boolean;



    constructor(
        private dialogRef: MatDialogRef<AddInvoiceDialogComponent>,
        private toastrService: ToastrService,
        private formService: FormHandlerService,
        private invoiceService: InvoiceService,
        private consultantService: ConsultantService,
        private companyService: CompanyService
    ) {

    }
    addTimesheet(newTimesheet: any) {
        this.timesheet = newTimesheet;
        this.isPulledTimesheet = true
        this.timesheetFileDownloadUri = this.timesheet.fileDownloadUri
    }
    appendFormTimesheet(){
        this.addInvoiceForm.value.timesheet=this.timesheetFileDownloadUri
      }
    addPdf(newPdf: any) {
        this.pdf = newPdf;
        this.isPulledPdf = true
        this.pdfFileDownloadUri = this.pdf.fileDownloadUri
    }
    appendFormPdf(){
        this.addInvoiceForm.value.pdf=this.pdfFileDownloadUri
      }
    ngOnInit() {
        this.companyService.getAll("/company/").subscribe(res => this.companyList = res)
        this.consultantService.getAll("/consultant/").subscribe(res => this.consultantList = res)
        this.invoiceService.addPrepare(this.url).subscribe(res => {this.addInvoiceForm = this.formService.entityToForm(res)
        },
        ()=>{

            this.addInvoiceForm.setValidators(Validators.required)

        }
        );
        
    }

    save() {

        let newInvoice = {}
        this.appendFormPdf()
        this.appendFormTimesheet()
        let formDto = this.formService.formToEntity(this.addInvoiceForm.value, newInvoice)
        console.log(formDto)
        return this.invoiceService.add(this.url, formDto).subscribe(
            res => {
                this.toastrService.success("Invoice added succcess.", "Successfully")
                this.close()
                location.reload();
            },
            error => {
                this.toastrService.error("There was a problem adding the invoice.", "!Oops")
            }
        )

    }

    close() {
        this.dialogRef.close();
    }



}
