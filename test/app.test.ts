import config from 'config'
const appConfig : any = config.get('appConfig')

import App from '../src/app'
import request, { Response } from 'supertest'
import { feEndpoints as endpoints } from '../src/models/enums/fe_endpoints_enum'
import IStorage from '../src/interfaces/storage_interface'
import StorageVolatile from '../src/repositories/volatile/storage_volatile'

let port: number
let storage: IStorage
let app: App

describe(`App is working: ${appConfig.name}`, () => {
    beforeEach(() => {
        port = appConfig.port || 8080
        storage = new StorageVolatile()
        app = new App(port, storage)
    })

    afterEach(() => {
        app.server.close()
    })

    test('/ ==> server root is listenning', async () => {        
        const res : Response = await request(app.thisApp).get(endpoints.SERVER_ROOT)
        
        expect(res.status).toBe(200)
        expect(res.body).toEqual(appConfig)
    })
});
