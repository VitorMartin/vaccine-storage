import IStorage from '../../src/interfaces/storage_interface'
import * as vaccineEnums from '../../src/models/enums/vaccine_enum'
import VaccineModel from '../../src/models/vaccine_model'
import StorageVolatile from '../../src/repositories/volatile/storage_volatile'
import AddVacs from '../../src/usecases/add_vacs'
import VaccineMock from '../mocks/vaccine_mock'

let storage: IStorage
let addVacs: AddVacs

describe('Usecases ==> add vaccines', () => {
    beforeEach(() => {
        storage = new StorageVolatile()
        addVacs = new AddVacs(storage)
    })

    describe('New vaccines into storage', () => {
        test('Add one vaccine', () => {
            const vaccine = new VaccineMock()
    
            expect(addVacs.call([vaccine])).toBe(true)
            expect(storage.getAllVacs()[0]).toBe(vaccine)
        })
    
        test('Add different vaccines', () => {
            const vaccines = [
                new VaccineModel(vaccineEnums.brand.JOHNSON, vaccineEnums.name.JANSSEN, vaccineEnums.mfr.JOHNSON, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10),
                new VaccineModel(vaccineEnums.brand.PFIZER, vaccineEnums.name.PFIZER, vaccineEnums.mfr.PFIZER, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10),
                new VaccineModel(vaccineEnums.brand.SINOVAC, vaccineEnums.name.ASTRAZENECA, vaccineEnums.mfr.BUTANTAN, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10),
            ]
    
            expect(addVacs.call(vaccines)).toBe(true)
            expect(storage.getAllVacs()).toStrictEqual(vaccines)
        })
    })
        
    describe('Updating vaccines in storage', () => {
        test('Add same vaccine with same due date', () => {
            const vaccines = [
                new VaccineMock('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
                new VaccineMock('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
                new VaccineMock('cccccccc-cccc-cccc-cccc-cccccccccccc')
            ]

            const expectedStorage = [new VaccineMock('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')]
            expectedStorage[0].qty = 30

            expect(addVacs.call(vaccines)).toBe(true)
            expect(storage.getAllVacs()).toStrictEqual(expectedStorage)
        })

        test('Add same vaccine with different due dates', () => {
            const vac1 = new VaccineMock('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')
            const vac2 = new VaccineMock('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb')
            const vac3 = new VaccineMock('cccccccc-cccc-cccc-cccc-cccccccccccc')
            vac1.dueDate = new Date(2022,0,1)
            vac2.dueDate = new Date(2023,0,1)
            vac3.dueDate = new Date(2024,0,1)
            
            const vaccines = [ vac1, vac2, vac3 ]

            expect(addVacs.call(vaccines)).toBe(true)
            expect(storage.getAllVacs()).toStrictEqual(vaccines)
        })
    })
})