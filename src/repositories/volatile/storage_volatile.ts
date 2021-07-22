import { VaccineModel } from "../../models/vaccine_model";
import { IStorage } from "../../interfaces/storage_interface";

export class StorageVolatile implements IStorage {
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
                    storageVac.qty > paramVac.qty
                        ? storageVac.qty -= paramVac.qty
                        : new Error("Qty too large");
                }
            })
            });
        }
        catch (pass) {
            return false
        }
        return true
    }

    countVac(vacName: string): VaccineModel {
        throw new Error("Method not implemented.");
    }

    getAllVacs(): VaccineModel[] {
        return this.storage
    } 
    

    // readItem(attr: string, val: any): ItemModel[] | object[] {
    //     try {
    //         var searchResult: ItemModel[] = this.data.filter(item => {
    //             return eval(`item.${attr}`) === val
    //         })
              
    //     } catch (pass) {
    //         return [{}]
    //     }
    //     return searchResult
    // }

    // updateItem(searchAttr: string, searchVal: any, newAttrVal: any): boolean {
    //     try {
    //         this.data.filter((item: ItemModel, i: number, data: ItemModel[]) => {
    //             let vaccine = <VaccineModel>item

    //             for (const property in vaccine) {
    //                 if (property === searchAttr) {
    //                     if (eval(`vaccine.${searchAttr}`) === searchVal) {
    //                         eval(`vaccine.${searchAttr} = ${newAttrVal}`)
    //                     }
    //                 }
    //             }
    //         })
    //     }
    //     catch (pass) {
    //         return false
    //     }
    //     return true
    // }

    // deleteItem(searchAttr: string, searchVal: any): boolean {
    //     try {
    //         let i = 0
    //         this.data.filter((item: ItemModel, pass: number, data: ItemModel[]) => {
    //             let vaccine = <VaccineModel>item

    //             for (const property in vaccine) {
    //                 if (property === searchAttr) {
    //                     if (eval(`vaccine.${searchAttr}`) === searchVal) {
    //                         data.splice(i, 1)
    //                         i--
    //                     }
    //                 }
    //             }
    //             i++
    //         })
    //     } catch (pass) {
    //         return false
    //     }
    //     return true
    // }
}