import { app } from "./app";

import config from 'config';
const appConfig : any = config.get('appConfig')

const main = async () => {
    const port = appConfig.port || 8080

    app.listen(port, () => {
        console.log(`MSS ${appConfig.name} is running:`);
        console.log(appConfig)
    });

}

main()
