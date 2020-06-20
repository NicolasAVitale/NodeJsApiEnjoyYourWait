import express from 'express'
// import DbClientFactory from '../server/db/DbClientFactory.js'
import { getProductosRouter } from './routers/productosRouters.js';
import { getUsuariosRouter } from './routers/usuariosRouter.js'
import { getFilaClientesRouter } from './routers/filaClientesRouter.js'
import { getClientesRouter } from './routers/clientesRouter.js'
import { getPromocionesRouter } from './routers/promocionesRouter.js'
import passport from 'passport'
import  MyPassport from "./passport.js";


class App {

    constructor() {
        const app = express();
        
        app.use(express.json());
        app.set('json spaces', 4);
        
        new MyPassport()
        app.use(passport.initialize());
        app.use('/api/productos', getProductosRouter());
        app.use('/api/usuarios', getUsuariosRouter());
        app.use('/api/filaclientes', getFilaClientesRouter());
        app.use('/api/clientes', getClientesRouter());
        app.use('/api/promociones', getPromocionesRouter());
        this.app = app;
        // this.dbClient = DbClientFactory.getDbClient()
    }

    setOnReady(cb) {
        this.app.on('app_ready', cb)
    }

    async start(port) {
        // await this.dbClient.connect()

        if (!port) {
            port = 0
        }

        const server = this.app.listen(port, () => {
            const actualPort = server.address().port
            this.app.emit("app_ready", actualPort)
        })
    }

    // async disconnect() {
    //     await this.dbClient.disconnect()
    // }
}

export default App
