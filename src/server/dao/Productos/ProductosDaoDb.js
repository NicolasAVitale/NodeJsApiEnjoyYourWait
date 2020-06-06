import ProductosDao from './ProductosDao.js'
import CustomError from '../../errores/CustomError.js'
import DbClientFactory from '../../db/DbClientFactory.js'

class ProductosDaoDb extends ProductosDao {


    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        this.tabla = 'dbo.Productos'
        this.idName = 'idProducto'
    }

     async getAll() {
        try {
            const productosGet = await this.client.fetchData('*', this.tabla)
            return productosGet
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los productos', err)
        }
    }

    async getById(id) {
        try {
            const productoGet = await this.client.getByID('*', this.tabla, id , this.idName)
            return productoGet
        } catch (err) {
            throw new CustomError(500, 'error al obtener todos los productos', err)
        }
    }

}


export default ProductosDaoDb