import { Company } from './company'
import { User } from './user'

export class Consultant {
    id: string
    identityNo:string
    user:User
    phone: string
    address: string
    ownedCompany: Company
    workedCompany: Company
    photo:string


    constructor() {
        this.id = null
        this.user=null
        this.phone = null
        this.address = null
        this.ownedCompany = null
        this.workedCompany = null
    }

}