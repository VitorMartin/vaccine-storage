import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router()

import config from 'config';
const appConfig : any = config.get('appConfig')
import { routerEndpoint as endpoint } from '../models/enums/router_endpoints_enum';
import { ItemModel } from '../models/item_model';
import { StorageVolatile } from '../controllers/db/volatile/storage_volatile';
import { VaccineModel } from '../models/vaccine_model';

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

router.post(endpoint.ITEM, (req: Request, res: Response) => {
    const items: ItemModel[] = []
    for (let i = 0; i < req.body.items.length; i++) {
        const itemJSON: JSON = req.body.items[i];
        const vaccine = VaccineModel.fromJSON(itemJSON)
        items.push(vaccine)
    }
    try {
        storage.insertItems(items)
    }
    catch (pass) {
        res.status(400).send()
    }
    res.status(201).send()
})

router.get(endpoint.ALL_ITEMS, (req: Request, res: Response) => {
    res.send(storage.getAllData())
})

router.get(endpoint.ITEM, (req: Request, res: Response) => {
    let items: ItemModel[] | object[]
    try {
        items = storage.readItem(req.body.attr, req.body.val)
    }
    catch (pass) {
        items = []
        res.status(400).send(items)
    }
    res.send(items)
})

export = router
