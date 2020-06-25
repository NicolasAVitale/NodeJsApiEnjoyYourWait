import express from 'express';
import FilaClientesApi from '../api/FilaClientesApi.js'
import jwtMdw from '../middleware/jwtMiddleware.js'

function getFilaClientesRouter(){

    const router = express.Router()

    const filaClientesApi = new FilaClientesApi()

    router.get('/:id/:capacidad/:tiempo', jwtMdw.ensureAuthenticated, async (req, res) => {
        
        try {
            const queryParams = new Map(Object.entries(req.params))
            const tiempoEstimado =  await filaClientesApi.calcularTiempoYPersonasPorCliente(queryParams)
            res.status(200).json(tiempoEstimado)
        } catch (err) {
            res.status(400).json(err)
        }
    })

    router.get('/:capacidad/:tiempo', jwtMdw.ensureAuthenticated, async (req, res) => {
        
        try {
            const queryParams = new Map(Object.entries(req.params))
            const tiempoEstimado =  await filaClientesApi.calcularTiempoYPersonasGeneral(queryParams)
            res.status(200).json(tiempoEstimado)
        } catch (err) {
            res.status(400).json(err)
        }
    })

    router.put('/:tiempo', jwtMdw.ensureAuthenticated, async (req, res) => {
        try {
            await filaClientesApi.actualizarEstadoClientesEnRestaurante(req.params.tiempo)
            const mensaje = { "mensaje": "editado correctamante" }
            res.status(204).send()
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.post('/agregarCliente', jwtMdw.ensureAuthenticated,  async (req, res) => {
        try {
            await filaClientesApi.agregarClienteAFila(req.body)
            const mensaje = { "mensaje": "agregado correctamante" }
            res.status(200).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    router.put('/sacarCliente/:idCliente', jwtMdw.ensureAuthenticated, async (req, res) => {
        try {
            await filaClientesApi.sacarClienteFila(req.params.idCliente)
            const mensaje = { "mensaje": "Salió de fila correctamante" }
            res.status(200).json(mensaje)
        } catch (err) {
            res.status(err.estado).json(err)
        }

    })

    return router;
}


export { getFilaClientesRouter }