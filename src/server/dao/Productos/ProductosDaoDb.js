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
    
    async add(prodNuevo) {
        try {
            const producto = await this.client.insertProduct(prodNuevo,this.tabla)
            return prodNuevo
        } catch (err) {
            throw new CustomError(500, 'error al crear el producto', err)
        }
        
    }

    async deleteById(id) {
        let result
        try {
            result = await this.client.deleteById(id, this.idName, this.tabla)
        } catch (err) {
            throw new CustomError(500, 'error al eliminar el producto', err)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, `no existe un producto para borrar con id: ${id}`, { id })
        }else{
            return result
        }

    }
}


export default ProductosDaoDb