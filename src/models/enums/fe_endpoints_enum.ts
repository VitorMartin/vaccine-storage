import { routerEndpoints } from './router_endpoints_enum'

export class feEndpoints { // FRONTEND ENDPOINTS. Class, but acts like enum: cannot parse variables as enums
    static SERVER_ROOT: string = routerEndpoints.ROOT
    static API_BASE_PATH: string = routerEndpoints.API_BASE_PATH
    static PING : string = `${routerEndpoints.API_BASE_PATH}${routerEndpoints.PING}`
    static VACCINE : string = `${routerEndpoints.API_BASE_PATH}${routerEndpoints.VACCINE}`
    static ALL_VACCINES : string = `${routerEndpoints.API_BASE_PATH}${routerEndpoints.ALL_VACCINES}`
}