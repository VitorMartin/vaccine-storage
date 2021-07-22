import { v4 as uuidv4 } from 'uuid'

export class ItemModel {
    uuid: string;
    qty: number;
    
    constructor(uuid: string = '', qty: number = 1) {
        uuid === '' ? this.uuid = uuidv4() : this.uuid = uuid;
        this.qty = qty
    }
}