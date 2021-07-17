import { ItemMock } from '../mocks/item_mock'

describe('Models ==> item', () => {
    test('instance item', () => {
        const item : ItemMock = new ItemMock()

        expect(typeof item.uuid).toBe('string')
    })
})