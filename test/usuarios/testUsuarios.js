import Cliente from '../usuarios/clienteUsuarios.js'
import Servidor from '../../src/server/app.js'

let token = null

async function obtenerToken(cli){
    let testFailed = false;
    let msg = 'get: ok';
    try{
        token = await cli.obtenerToken({
            nombre: 'usuarioApi',
            contrasena: 'usuario2020'
        })
    } catch (err) {
        testFailed = true;
        msg = 'get: ' + err.message; 
    }
    return { testFailed, msg }
}

async function agregarUsuario(cli){
    let testFailed = false;
    let msg = 'post with body: ok';

    try{
        await cli.agregarUsuario({
            dni: 23658923,
            nombre: 'Antonio',
            apellido: 'Banderas',
            email: 'abanderas@gmail.com',
            fechaNacimiento: '1965-02-01',
            contrasena: 'prueba',
            idRol: 2,
            fechaPrimerIngreso: '2020-06-13',
            activo: 1
        }, token)
    } catch (err) {
        testFailed = true;
        msg = 'post with body: ' + err.message; 
    }
    return { testFailed, msg }
}

async function agregarUsuarioConBadRequest(cli){
    let testFailed = false;
    let msg = 'post with body: ok';

    try{
        await cli.agregarUsuario({
            dni: 23658923,
            nombre: 123,
            apellido: 'Banderas',
            email: 'abanderas@gmail.com',
            fechaNacimiento: '1965-02-01',
            contrasena: 'prueba',
            idRol: 2,
            fechaPrimerIngreso: '2020-06-13',
            activo: 1
        }, token)
    } catch (err) {
        testFailed = true;
        msg = 'post with body: ' + err.message; 
    }
    return { testFailed, msg }
}

async function buscarUsuarios(cli){
    let testFailed = false;
    let msg = 'get: ok';
    try{
        await cli.buscarUsuarios(token)
    } catch (err) {
        testFailed = true;
        msg = 'get: ' + err.message; 
    }
    return { testFailed, msg }
}

async function buscarUsuarioPorId(cli){
    let testFailed = false;
    let msg = 'get: ok';
    try{
        await cli.buscarUsuariosPorIdORol({id: '2'}, token)
    } catch (err) {
        testFailed = true;
        msg = 'get: ' + err.message; 
    }
    return { testFailed, msg }
}

async function buscarUsuariosPorRol(cli){
    let testFailed = false;
    let msg = 'get: ok';
    try{
        await cli.buscarUsuariosPorIdORol({rol: '2'}, token)
    } catch (err) {
        testFailed = true;
        msg = 'get: ' + err.message; 
    }
    return { testFailed, msg }
}

async function actualizarUsuario(cli){
    let testFailed = false;
    let msg = 'put: ok';
    try{
        await cli.actualizarUsuario('2',{
            email: 'antonio.banderas@hotmail.com'
        }, token)
    } catch (err) {
        testFailed = true;
        msg = 'put: ' + err.message; 
    }
    return { testFailed, msg }
}

async function main() {
    const tests = [
        obtenerToken,
        agregarUsuario,
        agregarUsuarioConBadRequest,
        buscarUsuarios,
        buscarUsuarioPorId,
        buscarUsuariosPorRol,
        actualizarUsuario
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