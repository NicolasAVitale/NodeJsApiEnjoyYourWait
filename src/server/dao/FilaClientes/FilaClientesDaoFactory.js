import FilaClientesDaoDb from './FilaClientesDaoDb.js'
import Config from '../../../../config.js'


class FilaClientesDaoFactory {
    static getDao() {
        switch (Config.mode) {
            case 'db': return new FilaClientesDaoDb()
            default: throw "invalid mode. check system config!"
        }
    }
}

export default FilaClientesDaoFactory