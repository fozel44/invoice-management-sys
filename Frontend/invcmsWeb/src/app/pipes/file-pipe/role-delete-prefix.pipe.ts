import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleDeletePrefix'
})
export class RoleDeletePrefixPipe implements PipeTransform {

  transform(roleName: string): string {
    
    if(roleName){
       return roleName.split("_")[1];
    }

    return roleName ;
  }

}
