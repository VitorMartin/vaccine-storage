import express, { Application } from 'express';
export const app : Application = express()

import config from 'config';
const appConfig : any = config.get('appConfig')

import router from "./routers/routes";
import { routerEndpoint as endpoint } from './models/enums/router_endpoints_enum';

app.use(express.json())

app.use(endpoint.API_BASE_PATH, router)

app.get(endpoint.ROOT, (req, res) => {
    res.status(200).send(appConfig)
})
