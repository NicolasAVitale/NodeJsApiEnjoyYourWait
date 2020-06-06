import Producto from '../models/Producto.js'
import ProductosDaoFactory from '../dao/Productos/ProductoDaoFactory.js'
import CustomError from '../errores/CustomError.js'

class ProductosApi {

    constructor() {
       this.productosDao = ProductosDaoFactory.getDao()
    }


    async buscar(queryParams) {
        let productos
        if (queryParams.size == 0) {
            productos = await this.productosDao.getAll()
        } else if (queryParams.has('id')) {
            const id = parseInt(queryParams.get('id'))
            productos = await this.productosDao.getById(id)
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }
        
        return productos
    }
}


export default ProductosApi