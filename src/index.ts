import express, { Application } from 'express';
const app : Application = express()

import config from 'config';
const appConfig : any = config.get('appConfig')

import router from "./routers/routes";

app.use(express.json())

app.use(`/${appConfig.name}`, router)

app.listen(appConfig.port, () => {
    console.log(`MSS ${appConfig.name} is running:`);
    console.log(appConfig)
});
