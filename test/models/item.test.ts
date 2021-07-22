import ItemModel from '../../src/models/item_model'

describe('Models ==> item', () => {
    test('instance item without uuid', () => {
        const item : ItemModel = new ItemModel()
        console.log('item.uuid :>> ', item.uuid);
        expect(typeof item.uuid).toBe('string')
        expect(item.uuid.length).toBeGreaterThan(0)
        expect(item.qty).toBe(1)
    })
    
    test('instance item with given uuid and qty', () => {
        const item : ItemModel = new ItemModel('zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz', 99)

        expect(item.uuid).toBe('zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz')
        expect(item.qty).toBe(99)
    })
})