import FilaClientesDaoFactory from '../dao/FilaClientes/FilaClientesDaoFactory.js'
import CustomError from '../errores/CustomError.js'

class FilaClientesApi {

    constructor() {
       this.filaClientesDao = FilaClientesDaoFactory.getDao()
    }

    async calcularTiempoEstimado(queryParams) {
        let tiempoEstimado
        if (queryParams.has('id') && queryParams.has('capacidad') && queryParams.has('tiempo')) {
            const id = parseInt(queryParams.get('id'))
            const capacidad = parseInt(queryParams.get('capacidad'))
            const tiempo = parseInt(queryParams.get('tiempo'))
            tiempoEstimado = await this.filaClientesDao.calculateTimebyId(id, capacidad, tiempo)
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }
        
        return tiempoEstimado
    }

    async actualizarEstadoClientesEnRestaurante(queryParams) {
        if (queryParams.has('tiempo')) {
            const tiempo = parseInt(queryParams.get('tiempo'))
            tiempoEstimado = await this.filaClientesDao.updateRestaurantClientState(tiempo)
        } else {
            throw new CustomError(400, 'parametro para actualizar invalido', queryParams)
        }
        
        return tiempoEstimado
    }
}


export default FilaClientesApi