import Cliente from './client.js'
import Servidor from '../src/server/app.js'

async function agregarProducto(cli){
    let testFailed = false;
    let msg = 'post with body: ok';

    try{
        await cli.agregarProducto({
            nombre: 'Papas fritas',
            precio: 126.50,
            idTipo: 1,
            imagen: 'papas_fritas.jpg',
            activo: 1
        })
    } catch (err) {
        testFailed = true;
        msg = 'post with body: ' + err.message; 
    }
    return { testFailed, msg }
}

async function buscarProductos(cli){
    let testFailed = false;
    let msg = 'get: ok';
    try{
        await cli.buscarProductos()
    } catch (err) {
        testFailed = true;
        msg = 'get: ' + err.message; 
    }
    return { testFailed, msg }
}

async function activarProducto(cli){
    let testFailed = false;
    let msg = 'get: ok';
    try{
        await cli.activarProducto('55')

        // se restaura el producto para que vuelva a estar inactivo
        await cli.desactivarProducto('55')
    } catch (err) {
        testFailed = true;
        msg = 'get: ' + err.message; 
    }
    return { testFailed, msg }
}

async function desactivarProducto(cli){
    let testFailed = false;
    let msg = 'get: ok';
    try{
        await cli.desactivarProducto('54')

        // se restaura el producto para que vuelva a estar activo
        await cli.activarProducto('54')
    } catch (err) {
        testFailed = true;
        msg = 'get: ' + err.message; 
    }
    return { testFailed, msg }
}

async function main() {
    const tests = [
        agregarProducto,
        buscarProductos,
        activarProducto,
        desactivarProducto
    ];

    const ipDir = 'http://127.0.0.1'
    const app = new Servidor()
    app.setOnReady(async (actualPort) => {
        const cli = new Cliente(ipDir, actualPort)
        
        let done = 0
        let passed = 0
        let errors = 0

        console.log('running tests...\n')

        for (const test of tests) {
            const { testFailed, msg } = await test(cli, actualPort)
            if (testFailed) {
                errors++
                console.log(msg)
            } else {
                passed++
            }
            done++
        }
        console.log(`\ndone: ${done}`)
        console.log(`passed: ${passed}`)
        console.log(`errors: ${errors}`)

        process.exit(0)
    })

    app.start(8080)
}

main()