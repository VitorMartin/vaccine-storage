import { v4 as uuidv4 } from 'uuid'

export class ItemModel {
    uuid: string;
    
    constructor() {
        this.uuid = uuidv4()
    }
}