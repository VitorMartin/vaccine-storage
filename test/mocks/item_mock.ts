import { ItemModel } from "../../src/models/item_model";

export class ItemMock extends ItemModel {
    constructor(uuid : string = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee') {
        super()
        this.uuid = uuid
    }
}