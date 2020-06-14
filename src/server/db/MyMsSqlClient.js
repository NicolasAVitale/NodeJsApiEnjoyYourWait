/* eslint-disable no-console */
import Config from '../../../config.js'
import CustomError from '../errores/CustomError.js'
import mssql from 'mssql'
import DbClient from './DbClient.js'


class MyMsSqlClient extends DbClient{

    constructor() {
        super()
        this.configConnection = Config.db
    }

    async connect() {
        try {
            return await mssql.connect(this.configConnection);
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a SQL', error)
        }
    }

    async disconnect() {
        try {
            await mssql.close();
        } catch (error) {
            throw new CustomError(500, 'error al desconectarse a SQL', error)
        }
    }                   

    async fetchData(selectFields, tableName) {

        try {

            let pool = await this.connect()
            let result = await pool.request()
                .query(`select ${selectFields} from ${tableName}`)

            return result.recordset
            
        } catch (err) {
            // ... error checks
            console.error(err);
        }
    }

    async getByID(selectFields, tableName, id, idName) {

        try {

            let pool = await this.connect()
            let result = await pool.request()
                .input('id', mssql.Int, id)
                .query(`select ${selectFields} from ${tableName} where ${idName} = @id`)

            return result

        } catch (err) {
            // ... error checks
            console.error(err);
        }
    }

    async deleteById(id, idName, tableName) {

        try {
            let pool = await this.connect()
            let result = await pool.request()
                .query(`update ${tableName} where ${idName} = ${id}`)

            return result

        } catch (err) {
            console.error(err)
        }
    }

    async insertProduct(nuevo, tableName) {

        try {
            let pool = await this.connect()
            let result = await pool.request()
                .input('nombre', mssql.VarChar, nuevo.nombre)
                .input('precio', mssql.Decimal(6,2), nuevo.precio)
                .input('idTipo', mssql.Int, nuevo.idTipo)
                .input('imagen', mssql.NVarChar, nuevo.imagen)
                .query(`insert into ${tableName} (Nombre,Precio,IdTipo,Imagen) values (@nombre,@precio,@idTipo,@imagen)`)

            return result

        } catch (err) {
            console.error(err)
        }
    }

    async insertUsuario(nuevo, tableName) {

        try {
            let pool = await this.connect()
            let result = await pool.request()
                .input('dni', mssql.VarChar(50), nuevo.dni)
                .input('nombre', mssql.VarChar(50), nuevo.nombre)
                .input('apellido', mssql.VarChar(50), nuevo.apellido)
                .input('email', mssql.VarChar(50), nuevo.email)
                .input('fechaNacimiento', mssql.Date, nuevo.fechaNacimiento)
                .input('contrasena', mssql.VarChar(50), nuevo.contrasena)
                .input('idRol', mssql.Int, nuevo.idRol)
                .input('fechaPrimerIngreso', mssql.Date, nuevo.fechaPrimerIngreso)
                .input('activo', mssql.TinyInt, nuevo.activo)
                .query(`insert into ${tableName} values (@dni,@nombre,@apellido,@email,@fechaNacimiento,@contrasena,@idRol,@FechaPrimerIngreso,@activo)`)

            return result

        } catch (err) {
            console.error(err)
        }
    }

    async updateById(id, idName, tableName, datos) {

        try {
            let pool = await this.connect()
            let result = await pool.request()
                .query(`update ${tableName} SET ${datos} where ${idName} = ${id}`)

            return result

        } catch (err) {
            console.error(err)
        }
    }

    async getByNameAndPass(selectFields, tableName, name,pass) {

        try {
            let pool = await this.connect()
            let result = await pool.request()
                .input('nombre', mssql.VarChar(50), name)
                .input('contrasena', mssql.VarChar(50), pass)
                .query(`select ${selectFields} from ${tableName} where Nombre = '${name}' and Contrasena = '${pass}'`)

            return result

        } catch (err) {
            // ... error checks
            console.error(err);
        }
    }
}

export default MyMsSqlClient



