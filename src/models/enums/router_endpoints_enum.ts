import config from 'config'
const appConfig: any = config.get('appConfig')

export class routerEndpoints { // class, but acts like enum: cannot parse variables as enums
    static ROOT: string = '/'
    static API_BASE_PATH: string = `/${appConfig.name}/${appConfig.apiVersion}`
    static PING : string = '/ping'
    static VACCINE: string = '/vaccine'
    static ALL_VACCINES: string = '/vaccine/all'
}