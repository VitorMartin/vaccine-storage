const axios = require ('axios')

const config = require('config')
const appConfig = config.get('appConfig')
const url = `${appConfig.protocol}://${appConfig.host}:${appConfig.port}`

describe(`Endpoints working: ${appConfig.name}`, () => {
    test('ping ==> server is listenning', async () => {
        await axios.get(url + '/ping')
            .then((prom) => {
            expect(prom.data).toEqual(appConfig)
        })
    })
})
