import express, { Application } from 'express';

import config from 'config';
const appConfig: any = config.get('appConfig')

import { AppRouter } from "./routers/routes";
import { routerEndpoint as endpoint } from './models/enums/router_endpoints_enum';
import { StorageVolatile } from './repositories/volatile/storage_volatile';
import { IStorage } from './interfaces/storage_interface';

export class App {
    private thisApp: Application
    private thisRouter: AppRouter

    constructor(port: number, storage: IStorage) {
        this.thisApp = express()
        this.thisRouter = new AppRouter(storage)

        this.thisApp.use(express.json())

        this.thisApp.use(endpoint.API_BASE_PATH, this.thisRouter.router)

        this.thisApp.get(endpoint.ROOT, (req, res) => {
            res.status(200).send(appConfig)
        })

        this.thisApp.listen(port, () => {
            console.log(`MSS ${appConfig.name} is running:`);
            console.log(appConfig)
        })
    }
}
