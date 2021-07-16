import { ItemModel } from '../../src/models/item'

describe('Models ==> item', () => {
    test('instance item', () => {
        const item : ItemModel = new ItemModel()
        expect(typeof item.uuid).toBe('string')
    })
})