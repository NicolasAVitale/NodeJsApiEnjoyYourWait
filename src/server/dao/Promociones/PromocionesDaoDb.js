import PromocionesDao from './PromocionesDao.js'
import CustomError from '../../errores/CustomError.js'
import DbClientFactory from '../../db/DbClientFactory.js'
import moment from 'moment'

class PromocionesDaoDb extends PromocionesDao {


    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        this.tabla = 'dbo.Promociones'
        this.idName = 'idPromocion'
        this.tablaPromoProducto = 'dbo.PromocionProducto'
    }

     async getAll() {
        try {
            const promocionesGet = await this.client.fetchData('*', this.tabla)
            return promocionesGet
        } catch (err) {
            throw new CustomError(500, 'Error al obtener todas las promociones', err)
        }
    }

    async getById(id) {
        try {
            const promocionesGet = await this.client.getByID('*', this.tabla, id , this.idName)
            return promocionGet
        } catch (err) {
            throw new CustomError(500, 'Error al obtener la promocion', err)
        }
    }
    
    async add(promoNueva) {
        try {
            const promocion = await this.client.insertPromo(promoNueva,this.tabla)
            return promoNueva
        } catch (err) {
            throw new CustomError(500, 'Error al crear la promocion', err)
        }
        
    }

    async addProdEnPromo(idProducto, idPromocion) {
        try {
            const prodPromo = await this.client.insertProdEnProdPromo(idProducto, idPromocion, this.tablaPromoProducto)
            return prodPromo
        } catch (error) {
            throw new CustomError(500, 'Error al asociar un producto con una promocion', err)
        }
    }

    async updateById(id, datosAcambiar) {
        let result        
        try {
            
            if (datosAcambiar.descripcion == undefined) {
                datosAcambiar.descripcion = await this.getCampoById('descripcion',id)
                const descripcion = new Map(Object.entries(datosAcambiar.descripcion))
                datosAcambiar.descripcion = descripcion.get('0').descripcion
            }
            if (datosAcambiar.fechaInicio == undefined) {
                datosAcambiar.fechaInicio = await this.getCampoById('fechaInicio', id)
                const fechaInicio = new Map(Object.entries(datosAcambiar.fechaInicio))
                datosAcambiar.fechaInicio = moment(fechaInicio.get('0').fechaInicio).format('YYYY-MM-DD HH:mm:ss')
            }
            if (datosAcambiar.fechaBaja == undefined) {
                datosAcambiar.fechaBaja = await this.getCampoById('fechaBaja', id)
                const fechaBaja = new Map(Object.entries(datosAcambiar.fechaBaja))
                datosAcambiar.fechaBaja = moment(fechaBaja.get('0').fechaBaja).format('YYYY-MM-DD HH:mm:ss')
            }
            if (datosAcambiar.esPremio == undefined) {
                datosAcambiar.esPremio = await this.getCampoById('esPremio', id)
                const esPremio = new Map(Object.entries(datosAcambiar.esPremio))
                datosAcambiar.esPremio = esPremio.get('0').esPremio
            }
            if (datosAcambiar.activo == undefined) {
                datosAcambiar.activo = await this.getCampoById('activo', id)
                const activo = new Map(Object.entries(datosAcambiar.activo))
                datosAcambiar.activo = activo.get('0').activo
            }
          
            const datos = `descripcion = '${datosAcambiar.descripcion}', fechaInicio = '${datosAcambiar.fechaInicio}',  fechaBaja = '${datosAcambiar.fechaBaja}', esPremio = ${datosAcambiar.esPremio}, activo = ${datosAcambiar.activo}`
            result = await this.client.updateById(id, this.idName, this.tabla, datos)
        } catch (error) {
            throw new CustomError(500, 'Error al editar la promocion', error)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, 'No existe una promocion para editar con id: ${id}', { id })
        } else {
            return result
        }
    }

    async getCampoById(data,id){
        try {
            const campoGet = await this.client.getByID(data, this.tabla, id, this.idName)
            return campoGet
        } catch (err) {
            throw new CustomError(500, 'Error al obtener el campo', err)
        }
    }

    async deleteById(id) {
        let result
        try {
            result = await this.client.deleteById(id, this.idName, this.tabla)
        } catch (err) {
            throw new CustomError(500, 'Error al eliminar la promocion', err)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, 'No existe una promocion para borrar con id: ${id}', { id })
        }else{
            return result
        }

    }

    async enable(id) {
        let result
        try {
            const datos = 'activo = 1'
            result = await this.client.updateById(id, this.idName, this.tabla, datos)
        } catch (err) {
            throw new CustomError(500, 'Error al activar la promocion', err)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, 'No existe una promocion para activar con id: ${id}', { id })
        }else{
            return result
        }

    }

    async disable(id) {
        let result
        try {
            const datos = 'activo = 0'
            result = await this.client.updateById(id, this.idName, this.tabla, datos)
        } catch (err) {
            throw new CustomError(500, 'Error al desactivar la promocion', err)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, 'No existe una promocion para desactivar con id: ${id}', { id })
        }else{
            return result
        }

    }

    async enablePremio(id) {
        let result
        try {
            const datos = 'esPremio = 1'
            result = await this.client.updateById(id, this.idName, this.tabla, datos)
        } catch (err) {
            throw new CustomError(500, 'Error al marcar la promocion como premio', err)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, 'No existe una promocion para marcar como premio con id: ${id}', { id })
        }else{
            return result
        }

    }

    async disablePremio(id) {
        let result
        try {
            const datos = 'esPremio = 0'
            result = await this.client.updateById(id, this.idName, this.tabla, datos)
        } catch (err) {
            throw new CustomError(500, 'Error al desmarcar la promocion como premio', err)
        }

        if (result.rowsAffected == 0) {
            throw new CustomError(404, 'No existe una promocion para desmarcar como premio con id: ${id}', { id })
        }else{
            return result
        }

    }

    async getProductosByPromocionId(idPromocion) {
        try {
            const productos = await this.client.getProductosByPromocionId('p.idProducto, p.nombre, p.precio, p.idTipo, p.imagen, p.activo', 'dbo.Productos', 'dbo.PromocionProducto', idPromocion)
            return productos
        } catch (err) {
            throw new CustomError(500, 'Error al obtener todas los productos de la promoción', err)
        }
    }

    async getPromocionesCliente() {
        try {
            const promociones = await this.client.getPromocionesCliente('distinct p.idPromocion, p.descripcion, p.fechaInicio, p.fechaBaja, p.esPremio, p.activo', this.tabla, 'dbo.PromocionProducto')
            return promociones
        } catch (err) {
            throw new CustomError(500, 'Error al obtener todas las promociones', err)
        }
    }

}


export default PromocionesDaoDb