import FilaClientesDaoFactory from '../dao/FilaClientes/FilaClientesDaoFactory.js'
import CustomError from '../errores/CustomError.js'

class FilaClientesApi {

    constructor() {
       this.filaClientesDao = FilaClientesDaoFactory.getDao()
    }

    async calcularTiempoYPersonasPorCliente(queryParams) {
        let tiempoEstimado
        if (queryParams.has('id') && queryParams.has('capacidad') && queryParams.has('tiempo')) {
            const id = parseInt(queryParams.get('id'))
            const capacidad = parseInt(queryParams.get('capacidad'))
            const tiempo = parseInt(queryParams.get('tiempo'))
            tiempoEstimado = await this.filaClientesDao.calculateTimeAndPeopleById(id, capacidad, tiempo)
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }
        
        return tiempoEstimado
    }

    async calcularTiempoYPersonasGeneral(queryParams) {
        let tiempoEstimado
        if (queryParams.has('capacidad') && queryParams.has('tiempo')) {
            const capacidad = parseInt(queryParams.get('capacidad'))
            const tiempo = parseInt(queryParams.get('tiempo'))
            tiempoEstimado = await this.filaClientesDao.calculateGeneralTimeAndPeople(capacidad, tiempo)
        } else {
            throw new CustomError(400, 'parametros de consulta invalidos', queryParams)
        }
        
        return tiempoEstimado
    }

    async actualizarEstadoClientesEnRestaurante(tiempo) {
        let estadoActualizado
        estadoActualizado = await this.filaClientesDao.updateRestaurantClientState(tiempo)
        
        return estadoActualizado
    }


    async agregarClienteAFila(clienteFila) {
        let clienteFilaAgregado
        clienteFilaAgregado = await this.filaClientesDao.addClient(clienteFila)
        return clienteFilaAgregado
    }

    async editarClienteFila(idCliente,clienteFila) {
        let clienteFilaActualizado
        clienteFilaActualizado = await this.filaClientesDao.updateClient(idCliente,clienteFila)
        return clienteFilaActualizado
    }
}


export default FilaClientesApi