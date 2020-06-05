import ProductosDaoDb from './ProductosDaoDb.js'
import Config from '../../../../config.js'


class ProductosDaoFactory {
    static getDao() {
        switch (Config.mode) {
            case 'db': return new ProductosDaoDb()
            default: throw "invalid mode. check system config!"
        }
    }
}

export default ProductosDaoFactory