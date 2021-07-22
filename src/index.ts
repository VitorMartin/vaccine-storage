import App from "./app";

import config from 'config';
import StorageVolatile from "./repositories/volatile/storage_volatile";
const appConfig : any = config.get('appConfig')

const main = async () => {
    const storage = new StorageVolatile()
    const port = appConfig.port || 8080

    new App(port, storage)
}

main()
