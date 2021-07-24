import IStorage from "../interfaces/storage_interface";
import VaccineModel from "../models/vaccine_model";

export default class RemoveVacs {
    private storage: IStorage
    
    constructor(storage: IStorage) {
        this.storage = storage
    }

    call(vaccines: VaccineModel[]) : boolean {
        try {
            this.storage.removeVacs(vaccines)
        }
        catch (pass) {
            return false
        }
        return true
    }
}