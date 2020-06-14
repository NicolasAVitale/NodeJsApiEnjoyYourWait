import express from 'express';
import FilaClientesApi from '../api/FilaClientesApi.js'

function getFilaClientesRouter(){

    const router = express.Router()

    const filaClientesApi = new FilaClientesApi()

    router.get('/:id/:capacidad/:tiempo', async (req, res) => {
        
        try {
            const queryParams = new Map(Object.entries(req.query))
            const tiempoEstimado =  await filaClientesApi.calcularTiempoEstimado(queryParams)
            res.status(200).json(tiempoEstimado)
        } catch (err) {
            res.status(400).json(err)
        }
    })

    return router;
}


export { getFilaClientesRouter }