import config from 'config'
const appConfig : any = config.get('appConfig')

import { app } from '../../src/app'
import request, { Response } from 'supertest'
import { feEndpoint as endpoint } from '../../src/models/enums/fe_endpoints_enum'

import { VaccineMock } from '../mocks/vaccine_mock'

describe(`Router ==> endpoints`, () => {
    describe('Ping', () => {
        test('api is pinging', async () => {
            const res : Response = await request(app).get(endpoint.PING)

            expect(res.status).toBe(200)
            expect(res.body).toEqual(appConfig)
        })
    })

    describe.skip('Insert vacines', () => {
        test('add one vaccine', async () => {
            const vaccine = new VaccineMock()

            await request(app)
                .post(endpoint.VACCINE)
                .send({ 'vaccines': [vaccine] })
            
            const res: Response = await request(app)
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

            await request(app)
                .post(endpoint.VACCINE)
                .send({ 'vaccines': [vaccine] })
            
            const res: Response = await request(app)
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
