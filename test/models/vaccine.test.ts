import { VaccineModel } from '../../src/models/vaccine'
import * as vaccineEnums from '../../src/models/enums/vaccine'

describe('Models ==> vaccine', () => {
    test('instance vaccine', () => {
        const fabDate = new Date(2021, 6, 1)
        const dueDate = new Date(fabDate.getFullYear(), fabDate.getMonth() + 12, fabDate.getDate())
        const vaccine = new VaccineModel(vaccineEnums.brand.SINOVAC, vaccineEnums.name.BUTANVAC, vaccineEnums.mfr.BUTANTAN, 12, fabDate, dueDate)
        
        expect(vaccine.brand).toBe(vaccineEnums.brand.SINOVAC)
        expect(vaccine.name).toBe(vaccineEnums.name.BUTANVAC)
        expect(vaccine.mfr).toBe(vaccineEnums.mfr.BUTANTAN)
        expect(vaccine.qty).toBe(12)
        expect(vaccine.fabDate).toBe(fabDate)
        expect(vaccine.dueDate).toBe(dueDate)
    })
})