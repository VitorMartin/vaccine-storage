import { v4 as uuidv4 } from 'uuid'
import IStorage from '../../src/interfaces/storage_interface'
import * as vaccineEnums from '../../src/models/enums/vaccine_enum'
import VaccineModel from '../../src/models/vaccine_model'
import StorageVolatile from '../../src/repositories/volatile/storage_volatile'
import RemoveVacs from '../../src/usecases/remove_vacs'

let storage: IStorage
let removeVacs: RemoveVacs
let vacInStorage1: VaccineModel
let vacInStorage2: VaccineModel
let vacInStorage3: VaccineModel
let vacInStorage4: VaccineModel
let vacsInStorage: VaccineModel[]
let vacToRemove1: VaccineModel
let vacToRemove2: VaccineModel
let vacToRemove3: VaccineModel

describe('Usecases ==> remove vaccines', () => {
    beforeEach(() => {
        storage = new StorageVolatile()
        removeVacs = new RemoveVacs(storage)

        vacInStorage1 = new VaccineModel(vaccineEnums.brand.PFIZER, vaccineEnums.name.PFIZER, vaccineEnums.mfr.PFIZER, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10)
        vacInStorage2 = new VaccineModel(vaccineEnums.brand.PFIZER, vaccineEnums.name.PFIZER, vaccineEnums.mfr.PFIZER, new Date(2021, 0, 1), new Date(2023, 11, 31), '', 10)
        vacInStorage3 = new VaccineModel(vaccineEnums.brand.JOHNSON, vaccineEnums.name.JANSSEN, vaccineEnums.mfr.JOHNSON, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10)
        vacInStorage4 = new VaccineModel(vaccineEnums.brand.SINOVAC, vaccineEnums.name.BUTANVAC, vaccineEnums.mfr.BUTANTAN, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10)
        vacsInStorage = [vacInStorage1, vacInStorage2, vacInStorage3, vacInStorage4]
        
        vacToRemove1 = new VaccineModel(vaccineEnums.brand.PFIZER, vaccineEnums.name.PFIZER, vaccineEnums.mfr.PFIZER, new Date(2021, 0, 1), new Date(2023, 11, 31), '', 1)
        vacToRemove2 = new VaccineModel(vaccineEnums.brand.JOHNSON, vaccineEnums.name.JANSSEN, vaccineEnums.mfr.JOHNSON, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 1)
        vacToRemove3 = new VaccineModel(vaccineEnums.brand.PFIZER, vaccineEnums.name.PFIZER, vaccineEnums.mfr.PFIZER, new Date(2021, 0, 1), new Date(2024, 11, 31), '', 1)

        storage.addVacs(vacsInStorage)
    })

    test('Remove one vaccine', () => {
        expect(removeVacs.call([vacToRemove1])).toBe(true)
        expect(storage.getAllVacs()[0].qty).toBe(10)
        expect(storage.getAllVacs()[1].qty).toBe(9)
        expect(storage.getAllVacs()[2].qty).toBe(10)
        expect(storage.getAllVacs()[3].qty).toBe(10)
    })

    test('Remove several vaccines', () => {
        expect(removeVacs.call([vacToRemove1, vacToRemove2])).toBe(true)
        expect(storage.getAllVacs()[0].qty).toBe(10)
        expect(storage.getAllVacs()[1].qty).toBe(9)
        expect(storage.getAllVacs()[2].qty).toBe(9)
        expect(storage.getAllVacs()[3].qty).toBe(10)
    })

    test('Remove vaccine that does not exist', () => {
        expect(removeVacs.call([vacToRemove3])).toBe(true)
        expect(storage.getAllVacs()[0].qty).toBe(10)
        expect(storage.getAllVacs()[1].qty).toBe(10)
        expect(storage.getAllVacs()[2].qty).toBe(10)
        expect(storage.getAllVacs()[3].qty).toBe(10)
    })
})