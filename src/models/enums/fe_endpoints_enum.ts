import { routerEndpoint } from './router_endpoints_enum'

const basePath: string = routerEndpoint.API_BASE_PATH

export class feEndpoint { // FRONTEND ENDPOINTS. Class, but acts like enum: cannot parse variables as enums
    static SERVER_ROOT: string = routerEndpoint.ROOT
    static API_BASE_PATH: string = routerEndpoint.API_BASE_PATH
    static PING : string = `${routerEndpoint.API_BASE_PATH}/ping`
    static ITEM : string = `${routerEndpoint.API_BASE_PATH}/item`
}