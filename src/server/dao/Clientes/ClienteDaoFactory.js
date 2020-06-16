import ClientesDaoDb from './ClientesDaoDb.js'
import Config from '../../../../config.js'


class ClientesDaoFactory {
    static getDao() {
        switch (Config.mode) {
            case 'db': return new ClientesDaoDb()
            default: throw "invalid mode. check system config!"
        }
    }
}

export default ClientesDaoFactory