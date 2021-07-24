import IStorage from "../../../src/interfaces/storage_interface";
import VaccineModel from "../../../src/models/vaccine_model";
import StorageVolatile from "../../../src/repositories/volatile/storage_volatile";
import VaccineMock from '../../mocks/vaccine_mock'

let storage: IStorage
let vac1: VaccineModel

describe('Repository ==> volatile', () => {
    beforeEach(() => {
        vac1 = VaccineModel.fromJSON(new VaccineMock())
        storage = new StorageVolatile()
        storage.addVacs([vac1])
    })

    test('Add vaccine', () => {
        expect(storage.getAllVacs()).toStrictEqual([vac1])
        expect(storage.addVacs([vac1])).toBe(true)
    })

    test('Remove vaccine', () => {
        const vacToRemove = VaccineModel.fromJSON(new VaccineMock())
        vacToRemove.qty = 1
        expect(storage.removeVacs([vacToRemove])).toBe(true)
        expect(storage.getAllVacs()[0].qty).toBe(9)
    })

    test('Count vaccine', () => {
        expect(storage.countVacs(vac1)).toStrictEqual([vac1])
    })

    test('Get all vaccines', () => {
        expect(storage.getAllVacs()).toStrictEqual([vac1])
    })
})