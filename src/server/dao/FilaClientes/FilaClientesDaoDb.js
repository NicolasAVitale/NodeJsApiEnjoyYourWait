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

    async calculateTimebyId(id, capacidad, tiempo) {
        try {
            const tiempoEstimado = await this.client.calculateTimebyId(id, capacidad, tiempo)
            return tiempoEstimado
        } catch (err) {
            throw new CustomError(500, 'error al calcular el tiempo estimado de espera', err)
        }
    }
}


export default FilaClientesDaoDb