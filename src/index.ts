import express, { Application, Request, Response } from 'express';
const app : Application = express()
app.use(express.json())

import config from 'config';
const appConfig : any = config.get('appConfig')

app.get('/ping', (req : Request, res : Response) => {
    console.log(appConfig);
    res.send(appConfig)
})

app.listen(appConfig.port, () => {
    console.log(`MSS ${appConfig.name} is running:`);
    console.log(appConfig)
});
