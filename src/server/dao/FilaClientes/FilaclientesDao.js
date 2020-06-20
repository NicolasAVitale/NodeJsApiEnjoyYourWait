import CustomError from '../../errores/CustomError.js'

class FilaClientesDao {

    async calculateTimeAndPeopleById(id, capacidad, tiempo) {
        throw new CustomError(500, 'falta implementar calculateTimeAndPeopleById!')
    }

    async calculateGeneralTimeAndPeople(capacidad, tiempo) {
        throw new CustomError(500, 'falta implementar calculateGeneralTimeAndPeople!')
    }

    async updateRestaurantClientState(tiempo) {
        throw new CustomError(500, 'falta implementar updateRestaurantClientState!')
    }  
}

export default FilaClientesDao