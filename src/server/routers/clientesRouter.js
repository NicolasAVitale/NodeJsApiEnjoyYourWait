import express from 'express';
import ClientesApi from '../api/ClientesApi.js'
import jwtMdw from '../middleware/jwtMiddleware.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import CustomError from '../errores/CustomError.js'

function getClientesRouter() {

    const router = express.Router()

    const clientesApi = new ClientesApi()

    router.get('/', jwtMdw.ensureAuthenticated, async (req, res) => {

        try {
            const queryParams = new Map(Object.entries(req.query))
            const clientes = await clientesApi.buscar(queryParams)

            const respuesta = { "clientes": clientes }
            res.status(200).json(respuesta)
        } catch (err) {
            res.status(400).json(err)
        }
    })


    router.post('/', jwtMdw.ensureAuthenticated, async (req, res) => {

        const clienteAgregar = req.body
        try {
            const clienteAgregado = await clientesApi.agregar(clienteAgregar)
            res.status(201).json(clienteAgregado)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })
 
    router.delete('/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        try {
            await clientesApi.eliminar(req.params.id)
            res.status(204).send()
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.put('/:id', jwtMdw.ensureAuthenticated, async (req, res) => {

        const datos = req.body
        try {
            await clientesApi.actualizar(req.params.id, datos)
            const mensaje = { "mensaje": "editado correctamante" }
            res.status(204).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.post('/ingresar', async (req, res) => {


    })

    return router;
}


export { getClientesRouter }