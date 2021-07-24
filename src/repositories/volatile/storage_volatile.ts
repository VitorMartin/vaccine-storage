import VaccineModel from "../../models/vaccine_model";
import IStorage from "../../interfaces/storage_interface";

export default class StorageVolatile implements IStorage {
    private storage: VaccineModel[]

    constructor() {
        this.storage = []
    }

    addVacs(vaccines: VaccineModel[]): boolean {
        try {
            let currVacAdded: boolean;
            vaccines.forEach(paramVac => {
                currVacAdded = false
                this.storage.forEach((storageVac: VaccineModel) => {
                    if (storageVac.compatibleVacs(paramVac)) {
                        storageVac.qty += paramVac.qty // If current vac already in storage, just add qty
                        currVacAdded = true
                    }
                })
                if (!currVacAdded) {
                    this.storage.push(paramVac) // If current vac not in storage, add whole item to storage
                }
            });
        }
        catch (pass) {
            return false
        }
        return true
    }

    removeVacs(vaccines: VaccineModel[]): boolean {
        try {
            vaccines.forEach((paramVac: VaccineModel) => {
                this.storage.forEach((storageVac: VaccineModel) => {
                    if (storageVac.compatibleVacs(paramVac)) {
                        if (storageVac.qty > paramVac.qty) {
                            storageVac.qty -= paramVac.qty
                        }
                    }
                })
            });
        }
        catch (pass) {
            return false
        }
        return true
    }

    countVacs(paramVac: VaccineModel): VaccineModel[] {
        const countedVacs : VaccineModel[] = []
        try {
            this.storage.forEach(storageVac => {
                if (
                    storageVac.brand === paramVac.brand &&
                    storageVac.name === paramVac.name &&
                    storageVac.mfr === paramVac.mfr
                ) {
                    countedVacs.push(storageVac)
                }
            })
        }
        catch (pass) { }
        finally {
            return countedVacs
        }
    }

    getAllVacs(): VaccineModel[] {
        return this.storage
    }
}