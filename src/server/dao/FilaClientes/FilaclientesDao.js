import CustomError from '../../errores/CustomError.js'

class FilaClientesDao {

    async calculateTimeById(id, capacidad, tiempo) {
        throw new CustomError(500, 'falta implementar calculateTimeById!')
    }

    async updateRestaurantClientState(tiempo) {
        throw new CustomError(500, 'falta implementar updateRestaurantClientState!')
    }  
}

export default FilaClientesDao