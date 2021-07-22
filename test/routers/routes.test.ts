import config from 'config'
const appConfig : any = config.get('appConfig')

import App from '../../src/app'
import request, { Response } from 'supertest'
import { feEndpoints as endpoint } from '../../src/models/enums/fe_endpoints_enum'
import IStorage from '../../src/interfaces/storage_interface'
import StorageVolatile from '../../src/repositories/volatile/storage_volatile'
import VaccineMock from '../mocks/vaccine_mock'

let port: number
let storage: IStorage
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

    describe.skip('Insert vacines', () => {
        test('add one vaccine', async () => {
            const vaccine = new VaccineMock()

            await request(app.thisApp)
                .post(endpoint.VACCINE)
                .send({ 'vaccines': [vaccine] })
            
            const res: Response = await request(app.thisApp)
                .get(endpoint.VACCINE)
                .send({
                    "vaccine": {
                        "name": vaccine.name
                    }
                })
            
            expect(res.body.vaccines[0].uuid).toEqual(vaccine.uuid)
        })
    })

    describe.skip('Count vaccines', () => {
        test('Count vaccine by name', async () => {
            const vaccine = new VaccineMock()

            await request(app.thisApp)
                .post(endpoint.VACCINE)
                .send({ 'vaccines': [vaccine] })
            
            const res: Response = await request(app.thisApp)
                .get(endpoint.VACCINE)
                .send({
                    "vaccine": {
                        "name": vaccine.name
                    }
                })
            
            expect(res.body[0].uuid).toEqual(vaccine.uuid)
        })
    })
});
