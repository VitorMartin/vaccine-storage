import { VaccineMock } from '../mocks/vaccine_mock'
import * as vaccineEnums from '../../src/models/enums/vaccine_enum'

describe('Models ==> vaccine', () => {
    test('instance vaccine', () => {
        const fabDate : Date = new VaccineMock().fabDate
        const dueDate : Date = new VaccineMock().dueDate
        const qty: number = new VaccineMock().qty
        
        const vaccine = new VaccineMock()
        
        expect(vaccine.brand).toBe(vaccineEnums.brand.SINOVAC)
        expect(vaccine.name).toBe(vaccineEnums.name.BUTANVAC)
        expect(vaccine.mfr).toBe(vaccineEnums.mfr.BUTANTAN)
        expect(vaccine.qty).toBe(qty)
        expect(vaccine.fabDate).toBeInstanceOf(Date)
        expect(vaccine.fabDate).toEqual(fabDate)
        expect(vaccine.dueDate).toBeInstanceOf(Date)
        expect(vaccine.dueDate).toEqual(dueDate)
    })
})