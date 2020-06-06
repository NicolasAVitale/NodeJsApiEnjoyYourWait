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
    
    async agregar(prodAgregar) {
        ProductosApi.esProductoValido(prodAgregar)
        const prodAgregado = await this.productosDao.add(prodAgregar)
        return prodAgregado
    }

    async eliminar(id) {
        await this.productosDao.deleteById(id)
    }

    static esProductoValido(producto) {
        try {
            Producto.validar(producto)
        } catch (error) {
            throw new CustomError(400, 'el producto a ingresar es invalido', error)
        }
    }
}


export default ProductosApi