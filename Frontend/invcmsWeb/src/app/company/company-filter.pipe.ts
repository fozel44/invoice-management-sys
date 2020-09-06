import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../domain/company';

@Pipe({
  name: 'companyFilter'
})
export class CompanyFilterPipe implements PipeTransform {

  transform(value:Company[], filterText?: string): Company[] {
    filterText=filterText?filterText.toLocaleLowerCase():null;
    return filterText ? value.filter( (c:Company) => c.name.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        c.taxIdentificationNumber.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        c.taxOffice.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        c.phone.e164Number.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        c.address.toLocaleLowerCase().indexOf(filterText.trim())!==-1
                                                        ):value
  }

}
