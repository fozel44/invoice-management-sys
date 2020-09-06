import { Consultant } from './consultant'
import { Company } from './company'
import { Month } from './month'

export class Invoice{
    id:string
    consultant:Consultant
    month:Month
    year:number
    amount:number
    taxAmount:number
    ownerCompany:Company
    remoteCompany:Company
    pdf:string
    timesheet:string

    constructor(){
        this.id =null
        this.consultant=null
        this.month=null
        this.year=null
        this.amount=null
        this.pdf=null
        this.timesheet=null
    }
}