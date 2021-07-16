import { ItemModel } from './item';

export class VaccineModel extends ItemModel {
    brand : string;
    name : string;
    mfr : string; // Manufacturer
    qty : number;
    fabDate : Date; // Fabrication date
    dueDate : Date;

    constructor(brand : string, name : string, mfr : string, qty : number, fabDate : Date, dueDate : Date) {
        super();
        this.brand = brand
        this.name = name
        this.mfr = mfr
        this.qty = qty
        this.fabDate = fabDate
        this.dueDate = dueDate
    }
}