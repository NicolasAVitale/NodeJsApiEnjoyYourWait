import PromocionesDaoDb from './PromocionesDaoDb.js'
import Config from '../../../../config.js'


class PromocionesDaoFactory {
    static getDao() {
        switch (Config.mode) {
            case 'db': return new PromocionesDaoDb()
            default: throw "invalid mode. check system config!"
        }
    }
}

export default PromocionesDaoFactory