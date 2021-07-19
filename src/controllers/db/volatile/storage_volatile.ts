import { ItemModel } from "../../../models/item_model";
import { IStorage } from "../../../usecases/db/storage_interface";

export class StorageVolatile implements IStorage {
    private data: ItemModel[]

    constructor() {
        this.data = []
    }

    getAllData(): ItemModel[] {
        return this.data
    }
    
    insertItems(items : ItemModel[]): boolean {
        try {
            items.forEach(item => {
                this.data.push(item)
            });
        }
        catch (pass) {
            return false
        }
        return true
    }

    readItem(attr: string, val: any): ItemModel[] | object[] {
        try {
            var searchResult: ItemModel[] = this.data.filter(item => {
                return eval(`item.${attr}`) === val
            })
              
        } catch (pass) {
            return [{}]
        }
        return searchResult
    }
}