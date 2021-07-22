import ItemModel from "../../src/models/item_model";

export default class ItemMock extends ItemModel {
    constructor(uuid : string = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee') {
        super()
        this.uuid = uuid
    }
}