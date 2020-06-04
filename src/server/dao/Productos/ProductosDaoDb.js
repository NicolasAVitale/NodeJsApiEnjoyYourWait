import ProductosDao from './ProductosDao.js'
import Producto from '../../models/Producto.js'
import CustomError from '../../errores/CustomError.js'
import DbClientFactory from '../../db/DbClientFactory.js'

class ProductosDaoDb extends ProductosDao{

    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
    }

    async getAll() {
        try {
            const db = await this.client.query(selctepfasjlkfgjdfgkfh )
            //const productos = await db.

        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los clientes', err)
        }
    }


}


export default ProductosDaoDb