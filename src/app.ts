import express, { Application } from 'express';
export const app : Application = express()

import config from 'config';
const appConfig : any = config.get('appConfig')

import router from "./routers/routes";

app.use(express.json())

app.use(`/${appConfig.name}`, router)
