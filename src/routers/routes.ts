import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router()

import config from 'config';
const appConfig : any = config.get('appConfig')
import { routerEndpoint as endpoint } from '../models/enums/router_endpoints_enum';
import { ItemModel } from '../models/item_model';
import { StorageVolatile } from '../repositories/volatile/storage_volatile';
import { VaccineModel } from '../models/vaccine_model';
import { AddVacs } from '../usecases/addVacs';


const storage = new StorageVolatile()

router.use(function timeLog (req : Request, res : Response, next : NextFunction) {
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

router.get(endpoint.PING, (req: Request, res: Response) => {
    res.status(200).send(appConfig)
})

router.post(endpoint.VACCINE, (req: Request, res: Response) => {
    // Validate request ==> validate HTTP Protocol

    const addVacs = new AddVacs(storage)
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

router.get(endpoint.ALL_VACCINES, (req: Request, res: Response) => {
    res.send(storage.getAllVacs())
})

router.get(endpoint.VACCINE, (req: Request, res: Response) => {
    let vac: VaccineModel | {} = {}
    try {
        vac = storage.countVac(req.body.vaccine.name)
    }
    catch (pass) {
        res.status(400).send(vac)
    }
    res.send(vac)
})

export = router
