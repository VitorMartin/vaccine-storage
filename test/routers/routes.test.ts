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

    describe('Insert items', () => {
        test('add one item', async () => {
            const item = new VaccineMock()

            await request(app)
                .post(endpoint.ITEM)
                .send({ 'items': [item] })
            
            const res: Response = await request(app)
                .get(endpoint.ITEM)
                .send({
                    'attr': 'uuid',
                    'val': item.uuid
                })
            
            expect(res.body[0].uuid).toEqual(item.uuid)
        })
    })

    describe('Read items', () => {
        test('read one item by uuid', async () => {
            const item = new VaccineMock()

            await request(app)
                .post(endpoint.ITEM)
                .send({ 'items': [item] })
            
            const res: Response = await request(app)
                .get(endpoint.ITEM)
                .send({
                    'attr': 'uuid',
                    'val': item.uuid
                })
            
            expect(res.body[0].uuid).toEqual(item.uuid)
        })
    })
});
