import { Role } from './role'
import {Authorities} from './authorities'

export class User {
    id:string
    firstName:string;
    lastName:string;
    password:string;
    email:string
    token: any;
    roles: Role[];
    authorities:Authorities[];
    
  
    constructor() {
      this.id==null
      this.firstName = null;
      this.lastName=null;
      this.token=null;
      this.roles=null;
      this.authorities=null;
      this.password = null;
    }
  }