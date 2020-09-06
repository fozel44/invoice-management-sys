import { Phone } from './phone'


export class Company{
      id:string
      name : string;
      taxIdentificationNumber:string;
      taxOffice:string;
      phone:Phone;
      address:string;
      description:string;
      logo:string

      constructor() {
        this.id=null
        this.name = null
        this.taxIdentificationNumber = null
        this.taxOffice = null
        this.phone = null
        this.address = null
        this.description=null
        this.logo=null
    }

    
}