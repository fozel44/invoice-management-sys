import { Pipe, PipeTransform } from '@angular/core';
import { Invoice } from '../domain/invoice';

@Pipe({
  name: 'invoiceFilter'
})
export class InvoiceFilterPipe implements PipeTransform {

  transform(value:Invoice[], filterText?: string): Invoice[] {
    filterText=filterText?filterText.toLocaleLowerCase():null;
    return filterText ? value.filter( (i:Invoice) => i.month.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        i.year.toLocaleString().toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        i.amount.toLocaleString().toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        i.taxAmount.toLocaleString().indexOf(filterText.trim())!==-1||
                                                        i.ownerCompany.name.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        i.remoteCompany.name.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        i.consultant.user.firstName.toLocaleLowerCase().indexOf(filterText.trim())!==-1 
                                                        ):value
  }


}
