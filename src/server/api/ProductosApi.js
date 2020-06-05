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
        // } else if (queryParams.has('edadMin') && queryParams.has('edadMax')) {

            // if (isNaN(queryParams.get('edadMin')) || isNaN(queryParams.get('edadMax'))) {
            //     throw new CustomError(400, 'formato de edades invalido', queryParams)
            // }

            // const min = parseInt(queryParams.get('edadMin'))
            // const max = parseInt(queryParams.get('edadMax'))
            // estudiantes = await this.estudiantesDao.getByAge(min, max)
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }
        
        return productos
    }
}


export default ProductosApi