import { Pipe, PipeTransform } from '@angular/core';
import { Consultant } from '../domain/consultant';

@Pipe({
  name: 'consultantFilter'
})
export class ConsultantFilterPipe implements PipeTransform {

  transform(value:Consultant[], filterText?: string): Consultant[] {
    filterText=filterText?filterText.toLocaleLowerCase():null;
    return filterText ? value.filter( (c:Consultant) => c.user.firstName.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        c.user.lastName.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        c.user.email.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        c.phone.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        c.address.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        c.ownedCompany.name.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        c.workedCompany.name.toLocaleLowerCase().indexOf(filterText.trim())!==-1):value
  }

}
