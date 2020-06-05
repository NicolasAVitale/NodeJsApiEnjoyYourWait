import express from 'express';
import ProductosApi from '../api/ProductosApi.js'
import MyMsSqlClient from '../db/MyMsSqlClient.js'

function getProductosRouter(){

    const router = express.Router()

    const productosApi = new ProductosApi()

    router.get('/', async (req, res) => {
        
        try {
            const queryParams = new Map(Object.entries(req.query))
            const productos =  await productosApi.buscar(queryParams)
            res.status(200).json(productos)
        } catch (err) {
            res.status(400).json(err)
        }
    })

    return router;
}


export { getProductosRouter }