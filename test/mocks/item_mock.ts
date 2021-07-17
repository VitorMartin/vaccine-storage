import { ItemModel } from "../../src/models/item";

export class ItemMock extends ItemModel {
    constructor() {
        super()
        this.uuid = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
    }
}