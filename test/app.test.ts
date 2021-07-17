import path from 'path'

import config from 'config'
const appConfig : any = config.get('appConfig')
const basePath : string = `/${appConfig.name}/`

import { app } from '../src/app'
import request, { Response } from 'supertest'

describe(`App is working: ${appConfig.name}`, () => {
    test('/ ==> server root is listenning', async () => {        
        const res : Response = await request(app).get('/')
        
        expect(res.status).toBe(200)
        expect(res.body).toEqual(appConfig)
    })
});