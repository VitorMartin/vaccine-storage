import { VaccineModel } from '../../src/models/vaccine';
import * as vaccineEnums from '../../src/models/enums/vaccine_enum'

export class VaccineMock extends VaccineModel {
    constructor() {
        super(vaccineEnums.brand.SINOVAC, vaccineEnums.name.BUTANVAC, vaccineEnums.mfr.BUTANTAN, 10, new Date(2021, 0, 1), new Date(2022, 12, 31))
    }
}