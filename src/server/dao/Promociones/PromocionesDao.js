import CustomError from '../../errores/CustomError.js'

class PromocionesDao {

    async getAll() {
        throw new CustomError(500, 'Falta implementar getAll!')
    }

    async add(promoNueva) {
        throw new CustomError(500, 'Falta implementar add!')
    }

    async getById(id) {
        throw new CustomError(500, 'Falta implementar getById!')
    }

    async deleteById(id) {
        throw new CustomError(500, 'Falta implementar deleteById!')
    }

    async enable(id) {
        throw new CustomError(500, 'Falta implementar enable!')
    }

    async disable(id) {
        throw new CustomError(500, 'Falta implementar disable!')
    }

    async deleteAll() {
        throw new CustomError(500, 'Falta implementar deleteAll!')
    }

    async updateById(id, promoNueva) {
        throw new CustomError(500, 'Falta implementar updateById!')
    }

    async getProductosByPromocionId(idPromocion) {
        throw new CustomError(500, 'Falta implementar getProductosByPromocionId!')
    }

    async getPromocionesCliente() {
        throw new CustomError(500, 'Falta implementar getPromocionesCliente!')
    }
}

export default PromocionesDao