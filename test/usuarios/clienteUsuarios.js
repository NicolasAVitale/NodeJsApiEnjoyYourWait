import request from 'request-promise-native'

class Cliente {

    constructor(ipDir, puerto) {
        this.puerto = puerto
        this.serverUrl = `${ipDir}:${puerto}/api/usuarios`
    }

    async obtenerToken(datosAutenticacion) {
        const postOpt = {
            method: 'POST',
            uri: this.serverUrl + '/login',
            json: true
        }
        if (datosAutenticacion) {
            postOpt.body = datosAutenticacion
        }

        const res = await request(postOpt)
        return res.token
    }

    async agregarUsuario(usuario, token) {
        const postOpt = {
            method: 'POST',
            uri: this.serverUrl,
            json: true,
            auth:{
                "bearer": token
            }
        }
        if (usuario) {
            postOpt.body = usuario
        }

        const user = await request(postOpt)
        return user
    }

    async buscarUsuarios(token) {
        const usuarios = await request({
            method: 'GET',
            uri: this.serverUrl,
            json: true,
            auth:{
                "bearer": token
            }
        })
        return usuarios
    }
}

export default Cliente
