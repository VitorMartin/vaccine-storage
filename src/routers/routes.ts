import express, { Router, Request, Response, NextFunction } from 'express';

import config from 'config';
const appConfig : any = config.get('appConfig')

import IStorage from '../interfaces/storage_interface';
import { routerEndpoints as endpoints } from '../models/enums/router_endpoints_enum';
import VaccineModel from '../models/vaccine_model';
import AddVacs from '../usecases/addVacs';

export default class AppRouter {
    private storage: IStorage;
    router: Router;
    
    constructor(storage: IStorage) {
        this.router = express.Router()
        this.storage = storage

        this.router.use(function timeLog(req: Request, res: Response, next: NextFunction) {
            console.log({
                'datetime': new Date().toISOString(),
                'req': {
                    'body': req.body,
                    'method': req.method,
                    'originalUrl': req.originalUrl
                }
            })

            next()
        })

        this.router.get(endpoints.PING, (req: Request, res: Response) => {
            res.status(200).send(appConfig)
        })

        this.router.post(endpoints.VACCINE, (req: Request, res: Response) => {
            // Validate request ==> validate HTTP Protocol

            const addVacs = new AddVacs(this.storage)
            const vacs: VaccineModel[] = []
            for (let i = 0; i < req.body.vaccines.length; i++) {
                const vacJSON: JSON = req.body.vaccines[i];
                const vaccine = VaccineModel.fromJSON(vacJSON)
                vacs.push(vaccine)
            }
            try {
                // storage.insertItems(items)
                addVacs.call(vacs)
            }
            catch (pass) {
                res.status(400).send()
            }
            res.status(201).send()
        })

        this.router.get(endpoints.ALL_VACCINES, (req: Request, res: Response) => {
            res.send(this.storage.getAllVacs())
        })

        this.router.get(endpoints.VACCINE, (req: Request, res: Response) => {
            let vac: VaccineModel | {} = {}
            try {
                vac = this.storage.countVac(req.body.vaccine.name)
            }
            catch (pass) {
                res.status(400).send(vac)
            }
            res.send(vac)
        })
    }
}