import axios from 'axios';

import config from 'config';
const appConfig : any = config.get('appConfig')
const url = `${appConfig.protocol}://${appConfig.host}:${appConfig.port}`

describe(`Endpoints working: ${appConfig.name}`, () => {
    test('ping ==> server is listenning', async () => {
        await axios.get(url + '/ping')
            .then((prom : any) => {
            expect(prom.data).toEqual(appConfig)
        })
    })
})
