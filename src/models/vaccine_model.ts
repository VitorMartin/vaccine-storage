import { ItemModel } from './item_model';

export class VaccineModel extends ItemModel {
    brand : string;
    name : string;
    mfr : string; // Manufacturer
    fabDate : Date; // Fabrication date
    dueDate : Date;

    constructor(brand : string, name : string, mfr : string, qty : number = 1, fabDate : Date, dueDate : Date, uuid : string = '') {
        super(uuid, qty);
        this.brand = brand
        this.name = name
        this.mfr = mfr
        this.fabDate = fabDate
        this.dueDate = dueDate
    }

    static fromJSON(json: any) {
        return new VaccineModel(
            json.brand,
            json.name,
            json.mfr,
            json.qty,
            json.fabDate,
            json.dueDate,
            json.uuid || ''
        )
    }
}