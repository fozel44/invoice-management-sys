import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../domain/user';
import { filter } from 'rxjs/operators/';
import { Role } from '../domain/role';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(value:User[], filterText?: string): User[] {
    filterText=filterText?filterText.toLocaleLowerCase():null;
    return filterText ? value.filter( (u:User) =>   u.firstName.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        u.lastName.toLocaleLowerCase().indexOf(filterText.trim())!==-1||
                                                        u.email.toLocaleLowerCase().indexOf(filterText.trim())!==-1 ||
                                                        u.roles.map( role => role.name.toLocaleLowerCase().indexOf(filterText.trim()) !== -1).find(role=>role==true)
                                                        ):value
  }

}
