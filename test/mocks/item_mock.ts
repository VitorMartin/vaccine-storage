import { ItemModel } from "../../src/models/item_model";

export class ItemMock extends ItemModel {
    constructor() {
        super()
        this.uuid = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
    }
}