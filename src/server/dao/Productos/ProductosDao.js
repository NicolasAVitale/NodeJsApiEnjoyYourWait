import CustomError from '../../errores/CustomError.js'

class ProductosDao {

    async getAll() {
        throw new CustomError(500, 'falta implementar getAll!')
    }

    async add(prodNuevo) {
        throw new CustomError(500, 'falta implementar add!')
    }

    async getById(id) {
        throw new CustomError(500, 'falta implementar getById!')
    }

    async deleteById(id) {
        throw new CustomError(500, 'falta implementar deleteById!')
    }

    async enable(id) {
        throw new CustomError(500, 'falta implementar enable!')
    }

    async disable(id) {
        throw new CustomError(500, 'falta implementar disable!')
    }

    async deleteAll() {
        throw new CustomError(500, 'falta implementar deleteAll!')
    }

    async updateById(id, prodNuevo) {
        throw new CustomError(500, 'falta implementar updateById!')
    }

}

export default ProductosDao