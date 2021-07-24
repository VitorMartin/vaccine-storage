import IStorage from "../interfaces/storage_interface";
import VaccineModel from "../models/vaccine_model";

export default class GetAllVacs {
    private storage: IStorage
    
    constructor(storage: IStorage) {
        this.storage = storage
    }

    call() : VaccineModel[] {
        try {
            return this.storage.getAllVacs()
        }
        catch (pass) {
            return []
        }
    }
}
