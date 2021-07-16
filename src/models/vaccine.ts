import { v4 as uuidv4 } from 'uuid'

export class VaccineModel {
    uuid : string;
    brand : string;
    name : string;
    mfr : string; // Manufacturer
    qty : number;
    fabDate : Date; // Fabrication date
    dueDate : Date;

    constructor(brand : string, name : string, mfr : string, qty : number, fabDate : Date, dueDate : Date) {
        this.uuid = uuidv4()
        this.brand = brand
        this.name = name
        this.mfr = mfr
        this.qty = qty
        this.fabDate = fabDate
        this.dueDate = dueDate
    }
}