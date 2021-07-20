import { ItemModel } from "../../models/item_model";

export interface IStorage { // CRUD
    getAllData(): ItemModel[];
    insertItems(items : ItemModel[]): boolean;
    readItem(attr : string, val: any): ItemModel[] | object[];
    updateItem(searchAttr : string, searchVal: any, newAttrVal: any): boolean;
    // deleteItem(searchAttr : string, searchVal: string): boolean;
}