import IStorage from "../interfaces/storage_interface";
import ItemModel from "../models/item_model";
import VaccineModel from "../models/vaccine_model";

export default class CountVacs { // Should return a list of vaccines of same BRAND, NAME and MFR, separated by DUE DATE
    private storage: IStorage
    
    constructor(storage: IStorage) {
        this.storage = storage
    }

    call(vac: VaccineModel) : VaccineModel[] {
        try {
            return this.storage.countVacs(vac)
        }
        catch (pass) {
            return []
        }
    }
}
