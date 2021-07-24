import ItemModel from './item_model';

export default class VaccineModel extends ItemModel {
    brand : string;
    name : string;
    mfr : string; // Manufacturer
    fabDate : Date; // Fabrication date
    dueDate : Date;

    constructor(brand : string, name : string, mfr : string, fabDate : Date, dueDate : Date, uuid : string = '', qty : number = 1) {
        super(uuid, qty);
        this.brand = brand
        this.name = name
        this.mfr = mfr
        this.fabDate = fabDate
        this.dueDate = dueDate
    }

    compatibleVacs(vacToCompare: VaccineModel) {
        return (
            this.brand === vacToCompare.brand &&
            this.name === vacToCompare.name &&
            this.mfr === vacToCompare.mfr &&
            this.dueDate === vacToCompare.dueDate
        )
    }

    static fromJSON(json: any) {
        return new VaccineModel(
            json.brand,
            json.name,
            json.mfr,
            new Date(json.fabDate),
            new Date(json.dueDate),
            json.uuid || '',
            json.qty || 1
        )
    }
}