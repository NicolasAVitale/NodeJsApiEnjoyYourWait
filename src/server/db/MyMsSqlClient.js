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

    async query() {

        try {
            let pool = await this.connect()
            let result1 = await pool.request()
                .input('input_parameter', mssql.Int, 1)
                .query('select * from dbo.Productos where idProducto = @input_parameter')

            return (result1.recordset)
        } catch (err) {
            // ... error checks
            console.error(err);
        }
    }   

    async fetchData(selectFields, tableName) {

        try {

            let pool = await this.connect()
            let result1 = await pool.request()
                .query(`select ${selectFields} from ${tableName}`)

            return (result1.recordset)
            
        } catch (err) {
            // ... error checks
            console.error(err);
        }
    }

    async getByID(selectFields, tableName, id, idName) {

        try {

            let pool = await this.connect()
            let result1 = await pool.request()
                .input('id', mssql.Int, id)
                .query(`select ${selectFields} from ${tableName} where ${idName} = @id`)

            return (result1.recordset)

        } catch (err) {
            // ... error checks
            console.error(err);
        }
    }
    
        


}

export default MyMsSqlClient


