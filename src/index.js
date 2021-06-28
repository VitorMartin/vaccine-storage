const express = require ('express')
const app = express()
app.use(express.json())

const config = require('config')
const appConfig = config.get('appConfig')

app.get('/ping', (req, res) => {
    console.log(appConfig);
    res.send(appConfig)
})

app.listen(appConfig.port, () => {
    console.log(`MSS ${appConfig.name} is running:`);
    console.log(appConfig)
});