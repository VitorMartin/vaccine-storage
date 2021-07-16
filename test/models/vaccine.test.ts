import { VaccineModel } from '../../src/models/vaccine'
import { brand, mfr, name } from '../../src/models/enums/vaccine'

describe('Models ==> vaccine', () => {
    test('instance vaccine', () => {
        const fabDate = new Date(2021, 6, 1)
        const dueDate = new Date(fabDate.getFullYear(), fabDate.getMonth() + 12, fabDate.getDate())
        const vaccine = new VaccineModel(brand.SINOVAC, name.BUTANVAC, mfr.BUTANTAN, 12, fabDate, dueDate)
        
        expect(vaccine.brand).toBe(brand.SINOVAC)
        expect(vaccine.name).toBe(name.BUTANVAC)
        expect(vaccine.mfr).toBe(mfr.BUTANTAN)
        expect(vaccine.qty).toBe(12)
        expect(vaccine.fabDate).toBe(fabDate)
        expect(vaccine.dueDate).toBe(dueDate)
    })
})