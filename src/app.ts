import express, { Application } from 'express';
export const app : Application = express()

import config from 'config';
const appConfig : any = config.get('appConfig')

import { AppRouter } from "./routers/routes";
import { routerEndpoint as endpoint } from './models/enums/router_endpoints_enum';
import { StorageVolatile } from './repositories/volatile/storage_volatile';

const appRouter = new AppRouter(new StorageVolatile())

app.use(express.json())

app.use(endpoint.API_BASE_PATH, appRouter.router)

app.get(endpoint.ROOT, (req, res) => {
    res.status(200).send(appConfig)
})
