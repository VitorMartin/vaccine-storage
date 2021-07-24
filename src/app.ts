import express, { Application } from 'express';

import config from 'config';
const appConfig: any = config.get('appConfig')

import AppRouter from "./routers/routes";
import { routerEndpoints as endpoints } from './models/enums/router_endpoints_enum';
import IStorage from './interfaces/storage_interface';

export default class App {
    thisApp: Application
    server: any
    private thisRouter: AppRouter

    constructor(port: number, storage: IStorage) {
        this.thisApp = express()
        this.thisRouter = new AppRouter(storage)

        this.thisApp.use(express.json())

        this.thisApp.use(endpoints.API_BASE_PATH, this.thisRouter.router)

        this.thisApp.get(endpoints.ROOT, (req, res) => {
            res.status(200).send(appConfig)
        })

        this.server = this.thisApp.listen(port, () => {
            console.log(`MSS ${appConfig.name} is running:`);
            console.log(appConfig)
        })
    }
}
