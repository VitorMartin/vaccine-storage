import { StorageVolatile } from '../../../../src/controllers/db/volatile/storage_volatile'
import { VaccineModel } from '../../../../src/models/vaccine_model'
import { VaccineMock } from '../../../mocks/vaccine_mock'
import  * as vaccineEnums from '../../../../src/models/enums/vaccine_enum'

let storage : StorageVolatile

describe('Controllers ==> volatile storage', () => {
    beforeEach(() => {
        storage = new StorageVolatile()
    })

    describe('Get all data from storage', () => {
        test('Retrieve all data', () => {
            const items: VaccineMock[] = [
                new VaccineMock('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
                new VaccineMock('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
                new VaccineMock('cccccccc-cccc-cccc-cccc-cccccccccccc')
            ]

            storage.insertItems(items)

            expect(storage.getAllData()).toStrictEqual(items)
        })
    })

    describe('Insert item', () => {
        test('Create one item', () => {
            const item: VaccineMock = new VaccineMock()
    
            storage.insertItems([item])
    
            // expect(storage.readItem('uuid', item.uuid)[0]).toBe(item)
            expect(storage.getAllData()[0]).toBe(item)
        })
    
        test('Create several items', () => {
            const items: VaccineMock[] = [
                new VaccineMock('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
                new VaccineMock('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
                new VaccineMock('cccccccc-cccc-cccc-cccc-cccccccccccc')
            ]

            storage.insertItems(items)

            expect(storage.getAllData()).toStrictEqual(items)
        })
    })

    describe('Read item', () => {
        test('Read item by uuid', () => {
            const item: VaccineMock = new VaccineMock()
    
            storage.insertItems([item])

            expect(storage.readItem('uuid', item.uuid)[0]).toBe(item)
        })

        test('Read several items with same name', () => {
            const wantedItem1 = new VaccineMock('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa') // Same properties, but different uuid
            const wantedItem2 = new VaccineMock('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb') // Same properties, but different uuid
            const items: VaccineMock[] = [
                new VaccineModel(vaccineEnums.brand.OXFORD, vaccineEnums.name.ASTRAZENECA, vaccineEnums.mfr.BUTANTAN, 3, new Date(2021,0,1), new Date(2022,11,31)),
                wantedItem1,
                new VaccineModel(vaccineEnums.brand.JOHNSON, vaccineEnums.name.JANSSEN, vaccineEnums.mfr.JOHNSON, 3, new Date(2021,0,1), new Date(2022,11,31)),
                wantedItem2,
                new VaccineModel(vaccineEnums.brand.PFIZER, vaccineEnums.name.PFIZER, vaccineEnums.mfr.PFIZER, 3, new Date(2021,0,1), new Date(2022,11,31))
            ]
    
            storage.insertItems(items)

            expect(storage.readItem('name', wantedItem1.name)).toStrictEqual([wantedItem1, wantedItem2])
        })
    })

    describe('Update item', () => {
        test('Update qty by uuid', () => {
            const item = new VaccineMock()
            const newQty = 1
            storage.insertItems([item])
            
            expect(storage.readItem('uuid', item.uuid)).toStrictEqual([item])
            storage.updateItem('uuid', item.qty, newQty)
            item.qty = newQty
            expect(storage.readItem('uuid', item.uuid)).toStrictEqual([item])
        })
    })

    describe('Delete item', () => {
        test('Delete item by uuid', () => {
            const item0 = new VaccineMock('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')
            const item1 = new VaccineMock('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb')
            const item2 = new VaccineMock('cccccccc-cccc-cccc-cccc-cccccccccccc')
            const items = [item0, item1, item2]
            storage.insertItems(items)

            expect(storage.getAllData()).toStrictEqual(items)
            storage.deleteItem('uuid', item1.uuid)
            expect(storage.getAllData()).toStrictEqual([item0, item2])
        })
    })
})
