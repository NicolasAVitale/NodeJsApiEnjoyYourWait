import express from 'express';
import UsuariosApi from '../api/UsuariosApi.js'

function getUsuariosRouter() {

    const router = express.Router()

    const usuariosApi = new UsuariosApi()

    router.get('/', async (req, res) => {

        try {
            const queryParams = new Map(Object.entries(req.query))
            const usuarios = await usuariosApi.buscar(queryParams)

            const respuesta = { "usuarios": usuarios, "cantidad": usuarios.length }
            res.status(200).json(respuesta)
        } catch (err) {
            res.status(400).json(err)
        }
    })


    router.post('/', async (req, res) => {

        const usuarioAgregar = req.body
        try {
            const usuarioAgregado = await usuariosApi.agregar(usuarioAgregar)
            res.status(201).json(usuarioAgregado)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })
 
    router.delete('/:id', async (req, res) => {

        try {
            await usuariosApi.eliminar(req.params.id)
            res.status(204).send()
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.put('/:id', async (req, res) => {

        const datos = req.body
        try {
            await usuariosApi.actualizar(req.params.id, datos)
            const mensaje = { "mensaje": "editado correctamante" }
            res.status(204).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    return router;
}


export { getUsuariosRouter }