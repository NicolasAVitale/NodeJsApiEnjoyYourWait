import PromocionesDao from './PromocionesDao.js'
import CustomError from '../../errores/CustomError.js'
import DbClientFactory from '../../db/DbClientFactory.js'

class PromocionesDaoDb extends PromocionesDao {


    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        this.tabla = 'dbo.Promociones'
        this.idName = 'idPromocion'
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
            /*Ver en donde se puede guardar el nombre de la tabla de promocionproducto*/
            const prodPromo = await this.client.insertProdEnProdPromo(idProducto, idPromocion, 'PromocionProducto')
            return 'Producto asociado a la promocion exitosamente'
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
                datosAcambiar.fechaInicio = fechaInicio.get('0').fechaInicio
            }
            if (datosAcambiar.fechaBaja == undefined) {
                datosAcambiar.fechaBaja = await this.getCampoById('fechaBaja', id)
                const fechaBaja = new Map(Object.entries(datosAcambiar.fechaBaja))
                datosAcambiar.fechaBaja = fechaBaja.get('0').fechaBaja
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
            return campoGet.recordset
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
}


export default PromocionesDaoDb