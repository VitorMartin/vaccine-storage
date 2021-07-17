import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router()

import config from 'config';
const appConfig : any = config.get('appConfig')
import { routerEndpoint as endpoint } from '../models/enums/router_endpoints_enum';

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

export = router
