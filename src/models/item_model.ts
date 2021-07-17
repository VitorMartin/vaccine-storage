import { v4 as uuidv4 } from 'uuid'

export class ItemModel {
    uuid: string;
    
    constructor(uuid: string = '') {
        uuid === '' ? this.uuid = uuidv4() : this.uuid = uuid;
    }
}