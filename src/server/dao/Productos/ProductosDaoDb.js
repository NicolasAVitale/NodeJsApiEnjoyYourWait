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

    async updateById(id, datosAcambiar) {
        let result
        try {
            
            if (datosAcambiar.imagen == undefined) {
                datosAcambiar.imagen = await this.getCampoById('imagen',id)
                const imagen = new Map(Object.entries(datosAcambiar.imagen))
                datosAcambiar.imagen = imagen.get('0').imagen
            }
            if (datosAcambiar.precio == undefined) {
                datosAcambiar.precio = await this.getCampoById('precio', id)
                const precio = new Map(Object.entries(datosAcambiar.Precio))
                datosAcambiar.precio = precio.get('0').precio
            }
            if (datosAcambiar.nombre == undefined) {
                datosAcambiar.nombre = await this.getCampoById('nombre', id)
                const nombre = new Map(Object.entries(datosAcambiar.nombre))
                datosAcambiar.nombre = nombre.get('0').nombre
            }
            if (datosAcambiar.activo == undefined) {
                datosAcambiar.activo = await this.getCampoById('activo', id)
                const activo = new Map(Object.entries(datosAcambiar.activo))
                datosAcambiar.activo = activo.get('0').activo
            }

            const datos = `nombre = '${datosAcambiar.nombre}', precio = ${datosAcambiar.precio}, imagen = '${datosAcambiar.imagen}', activo = ${datosAcambiar.activo}`
            result = await this.client.updateById(id, this.idName, this.tabla, datos)
        } catch (error) {
            throw new CustomError(500, `error al editar el producto`, error)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, `no existe un producto para editar con id: ${id}`, { id })
        } else {
            return result
        }
    }

    async getCampoById(data,id){
        try {
            const campoGet = await this.client.getByID(data, this.tabla, id, this.idName)
            return campoGet.recordset
        } catch (err) {
            throw new CustomError(500, 'error al obtener el campo', err)
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

    async enable(id) {
        let result
        try {
            const datos = `activo = 1`
            result = await this.client.updateById(id, this.idName, this.tabla, datos)
        } catch (err) {
            throw new CustomError(500, 'error al activar el producto', err)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, `no existe un producto para activar con id: ${id}`, { id })
        }else{
            return result
        }

    }

    async disable(id) {
        let result
        try {
            const datos = `activo = 0`
            result = await this.client.updateById(id, this.idName, this.tabla, datos)
        } catch (err) {
            throw new CustomError(500, 'error al desactivar el producto', err)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, `no existe un producto para desactivar con id: ${id}`, { id })
        }else{
            return result
        }

    }
}


export default ProductosDaoDb