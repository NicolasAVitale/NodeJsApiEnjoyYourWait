import request from 'request-promise-native'

class Cliente {

    constructor(ipDir, puerto) {
        this.ipDir = ipDir
        this.puerto = puerto
        this.serverUrl = `${ipDir}:${puerto}/api/productos`
    }

    async obtenerToken(datosAutenticacion) {
        const postOpt = {
            method: 'POST',
            uri:  `${this.ipDir}:${this.puerto}/api/usuarios/login`,
            json: true
        }
        if (datosAutenticacion) {
            postOpt.body = datosAutenticacion
        }

        const res = await request(postOpt)
        return res.token
    }

    async agregarProducto(producto, token) {
        const postOpt = {
            method: 'POST',
            uri: this.serverUrl,
            json: true,
            auth:{
                "bearer": token
            }
        }
        if (producto) {
            postOpt.body = producto
        }

        const res = await request(postOpt)
        return res.token
    }

    async buscarProductos(token) {
        const productos = await request({
            method: 'GET',
            uri: this.serverUrl,
            json: true,
            auth:{
                "bearer": token
            }
        })
        return productos
    }

    async buscarProductoPorId(params, token) {
        const producto = await request({
            method: 'GET',
            uri: this.serverUrl,
            qs: params,
            json: true,
            auth:{
                "bearer": token
            }
        })
        return producto
    }

    async actualizarProducto(id, datos, token) {
        const producto = await request({
            method: 'PUT',
            uri: this.serverUrl + '/' + id,
            body: datos,
            json: true,
            auth:{
                "bearer": token
            }
        })
        return producto
    }

    async activarProducto(id, token) {
        const productos = await request({
            method: 'PUT',
            uri: this.serverUrl + '/activar/' + id, 
            json: true,
            auth:{
                "bearer": token
            }
        })
        return productos
    }


    async desactivarProducto(id, token) {
        const productos = await request({
            method: 'PUT',
            uri: this.serverUrl + '/desactivar/' + id, 
            json: true,
            auth:{
                "bearer": token
            }
        })
        return productos
    }
}

export default Cliente
