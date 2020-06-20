import Promocion from '../models/Promocion.js'

function validarPromociones(promociones) {
    for (const promocion of promociones) {
        validarPromocion(promociones)
    }
}

function validarPromocion(promocion) {
    Promocion.validar(promocion)
}


export {
    validarPromociones,
    validarPromocion
}