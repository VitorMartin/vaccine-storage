import config from 'config'
const appConfig : any = config.get('appConfig')

import { app } from '../../src/app'
import request, { Response } from 'supertest'
import { feEndpoint as endpoint } from '../../src/models/enums/fe_endpoints_enum'

describe(`Router ==> endpoints`, () => {
    test('api is pinging', async () => {        
        const res : Response = await request(app).get(endpoint.PING)
        
        expect(res.status).toBe(200)
        expect(res.body).toEqual(appConfig)
    })
});
