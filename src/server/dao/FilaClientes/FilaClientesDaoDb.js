import FilaClientesDao from './FilaClientesDao.js'
import CustomError from '../../errores/CustomError.js'
import DbClientFactory from '../../db/DbClientFactory.js'

class FilaClientesDaoDb extends FilaClientesDao {

    constructor(){
        super()
        this.client = DbClientFactory.getDbClient()
        this.tabla = 'dbo.FilaCliente'
        this.idName = 'idCliente'
    }

    async calculateTimeById(id, capacidad, tiempo) {
        try {
            console.log(id)
            console.log(capacidad)
            console.log(tiempo)
            const tiempoEstimado = await this.client.calculateTimeById(id, capacidad, tiempo)
            return tiempoEstimado
        } catch (err) {
            throw new CustomError(500, 'error al calcular el tiempo estimado de espera', err)
        }
    }

    async updateRestaurantClientState(tiempo) {
        let result
        try {
            result = await this.client.updateRestaurantClientState(tiempo)
            return result
        } catch (err) {
            throw new CustomError(500, 'error al actualizar el estado de los clientes dentro del restaurante', err)
        }
    }
}


export default FilaClientesDaoDb