import IStorage from '../../src/interfaces/storage_interface'
import * as vaccineEnums from '../../src/models/enums/vaccine_enum'
import VaccineModel from '../../src/models/vaccine_model'
import StorageVolatile from '../../src/repositories/volatile/storage_volatile'
import GetAllVacs from '../../src/usecases/get_all_vacs'

let storage: IStorage
let getAllVacs: GetAllVacs
let vac1: VaccineModel
let vac2: VaccineModel
let vac3: VaccineModel
let vacs: VaccineModel[]

describe('Usecases ==> get all vaccines', () => {
    beforeAll(() => {
        storage = new StorageVolatile()
        getAllVacs = new GetAllVacs(storage)
        vac1 = new VaccineModel(vaccineEnums.brand.PFIZER, vaccineEnums.name.PFIZER, vaccineEnums.mfr.PFIZER, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10)
        vac2 = new VaccineModel(vaccineEnums.brand.JOHNSON, vaccineEnums.name.JANSSEN, vaccineEnums.mfr.JOHNSON, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10)
        vac3 = new VaccineModel(vaccineEnums.brand.JOHNSON, vaccineEnums.name.JANSSEN, vaccineEnums.mfr.JOHNSON, new Date(2021, 0, 1), new Date(2023, 11, 31), '', 10)
        vacs = [vac1, vac2, vac3]
        storage.addVacs(vacs)
    })

    test('Check entire storage', () => {
        expect(getAllVacs.call()).toStrictEqual(vacs)
    })
})