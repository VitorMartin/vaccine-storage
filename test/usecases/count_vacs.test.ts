import IStorage from '../../src/interfaces/storage_interface'
import * as vaccineEnums from '../../src/models/enums/vaccine_enum'
import VaccineModel from '../../src/models/vaccine_model'
import StorageVolatile from '../../src/repositories/volatile/storage_volatile'
import CountVacs from '../../src/usecases/count_vacs'

let storage: IStorage
let countVacs: CountVacs
let vac1: VaccineModel
let vac2: VaccineModel
let vac3: VaccineModel
let vac4: VaccineModel
let vac5: VaccineModel
let vacs: VaccineModel[]

describe('Usecases ==> count vaccines', () => {
    beforeAll(() => {
        storage = new StorageVolatile()
        countVacs = new CountVacs(storage)

        vac1 = new VaccineModel(vaccineEnums.brand.PFIZER, vaccineEnums.name.PFIZER, vaccineEnums.mfr.PFIZER, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10)

        vac2 = new VaccineModel(vaccineEnums.brand.JOHNSON, vaccineEnums.name.JANSSEN, vaccineEnums.mfr.JOHNSON, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10)
        vac3 = new VaccineModel(vaccineEnums.brand.JOHNSON, vaccineEnums.name.JANSSEN, vaccineEnums.mfr.JOHNSON, new Date(2021, 0, 1), new Date(2023, 11, 31), '', 10)
        
        vac4 = new VaccineModel(vaccineEnums.brand.SINOVAC, vaccineEnums.name.BUTANVAC, vaccineEnums.mfr.BUTANTAN, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10)
        vac5 = new VaccineModel(vaccineEnums.brand.SINOVAC, vaccineEnums.name.BUTANVAC, vaccineEnums.mfr.BUTANTAN, new Date(2021, 0, 1), new Date(2022, 11, 31), '', 10)
        
        vacs = [vac1, vac2, vac3, vac4, vac5]
        
        storage.addVacs(vacs)
    })

    test('Count one single vaccine', () => {
        expect(countVacs.call(vac1)).toStrictEqual([vac1])
    })

    test('Count one vaccine with different due dates', () => {
        expect(countVacs.call(vac2)).toStrictEqual([vac2, vac3])
        expect(countVacs.call(vac3)).toStrictEqual([vac2, vac3])
    })

    test('Count one vaccine with same due date', () => {
        let vac: VaccineModel

        vac = vac4
        vac.qty = vac4.qty + vac5.qty
        expect(countVacs.call(vac4)).toStrictEqual([vac])
        expect(countVacs.call(vac5)).toStrictEqual([vac])
        
        // Checking if returns uuid of the first vac found (vac4)
        vac = vac5
        vac.qty = vac4.qty + vac5.qty
        expect(countVacs.call(vac5)).not.toStrictEqual([vac])
    })
})