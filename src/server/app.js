import express from 'express'
import MyMsSqlClient from '../server/db/MyMsSqlClient.js'
import { getProductosRouter } from './routers/productosRouters.js';

class App {

    constructor() {
        const app = express();
        app.use(express.json());
        app.set('json spaces', 4);
        app.use('/api/productos', getProductosRouter());
        this.app = app;

        // this.dbClient = DbClientFactory.getDbClient()
    }

    setOnReady(cb) {
        this.app.on('app_ready', cb)
    }

    async start(port) {
        await this.dbClient.connect()

        if (!port) {
            port = 0
        }

        const server = this.app.listen(port, () => {
            const actualPort = server.address().port
            this.app.emit("app_ready", actualPort)
        })
    }

    async disconnect() {
        await this.MyMsSqlClient.disconnect();
    }
}

export default App
