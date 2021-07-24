import config from 'config'
const appConfig : any = config.get('appConfig')

import App from '../../src/app'
import request, { Response } from 'supertest'
import { feEndpoints as endpoint } from '../../src/models/enums/fe_endpoints_enum'
import IStorage from '../../src/interfaces/storage_interface'
import StorageVolatile from '../../src/repositories/volatile/storage_volatile'
import VaccineMock from '../mocks/vaccine_mock'
import VaccineModel from '../../src/models/vaccine_model'

let port: number
let storage: any
let app: App

describe(`Router ==> endpoints`, () => {
    beforeEach(() => {
        port = appConfig.port || 8080
        storage = new StorageVolatile()
        app = new App(0, storage)
    })

    afterEach(() => {
        app.server.close()
    })

    describe('Ping', () => {
        test('API is pinging', async () => {
            const res : Response = await request(app.thisApp).get(endpoint.PING)

            expect(res.status).toBe(200)
            expect(res.body).toEqual(appConfig)
        })
    })

    describe('Insert vacines', () => {
        test('add one vaccine', async () => {
            const vaccine = new VaccineMock()

            await request(app.thisApp)
                .post(endpoint.VACCINE)
                .send({ 'vaccines': [vaccine] })
            
            const res: Response = await request(app.thisApp)
                .get(endpoint.VACCINE)
                .send({ "vaccine": vaccine })
            
            expect(res.body.vaccines[0].uuid).toEqual(vaccine.uuid)
        })
    })

    describe('Count vaccines', () => {
        test('Count vaccine', async () => {
            const vaccine = VaccineModel.fromJSON(new VaccineMock())

            await request(app.thisApp)
                .post(endpoint.VACCINE)
                .send({ 'vaccines': [vaccine] })
            
            const res: Response = await request(app.thisApp)
                .get(endpoint.VACCINE)
                .send({ "vaccine": vaccine })

            expect(VaccineModel.fromJSON(res.body.vaccines[0])).toEqual(vaccine)
            expect(res.body.vaccines[0].qty).toBe(vaccine.qty)
        })
    })
});
