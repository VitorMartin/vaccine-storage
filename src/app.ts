import express, { Application } from 'express';
export const app : Application = express()

import config from 'config';
const appConfig : any = config.get('appConfig')

import router from "./routers/routes";

app.use(express.json())

app.use(`/${appConfig.name}`, router)

app.get('/', (req, res) => {
    res.status(200).send(appConfig)
})
