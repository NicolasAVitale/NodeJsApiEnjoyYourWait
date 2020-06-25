import Promocion from '../models/Promocion.js'
import PromocionesDaoFactory from '../dao/Promociones/PromocionesDaoFactory.js'
import CustomError from '../errores/CustomError.js'
import Producto from '../models/Producto.js'

class PromocionesApi {

    constructor() {
       this.promocionesDao = PromocionesDaoFactory.getDao()
    }


    async buscar(queryParams) {
        let promociones
        if (queryParams.size == 0) {
            promociones = await this.promocionesDao.getAll()
        } else if (queryParams.has('id')) {
            const id = parseInt(queryParams.get('id'))
            promociones = await this.promocionesDao.getById(id)
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }
        
        return promociones
    }
    
    async agregar(promoAgregar) {
        PromocionesApi.esPromocionValida(promoAgregar)
        const promoAgregado = await this.promocionesDao.add(promoAgregar)
        return promoAgregado
    }

    async actualizar(id,datosAactualizar){
        const promoActualizada = await this.promocionesDao.updateById(id, datosAactualizar)
        return promoActualizada
    }

    async activar(id) {
        await this.promocionesDao.enable(id)
    }

    async desactivar(id) {
        await this.promocionesDao.disable(id)
    }

    async esPremio(id) {
        await this.promocionesDao.enablePremio(id)
    }

    async noEsPremio(id) {
        await this.promocionesDao.disablePremio(id)
    }

    /*Asocia un producto a una promocion*/
    async agregarProductoApromocion(producto, promocion) {
        const prodPromoAsociados = await this.promocionesDao.addProdEnPromo(producto, promocion)
        return prodPromoAsociados
    }


    static esPromocionValida(promocion) {
        try {
            Promocion.validar(promocion)
        } catch (error) {
            throw new CustomError(400, 'La promocion es invalida', error)
        }
    }

}


export default PromocionesApi