import MyMsSqlClient from './MyMsSqlClient.js'

const hole = new MyMsSqlClient();

// console.log(hole.connect());
// console.log(hole.disconnect());


async function conectar() {

    try {
        const data = await hole.connect();
        console.log(data); // will print your data
    } catch (error) {
        
    }
    
}

async function descoenctar() {
    try {
        const data1 = await hole.disconnect();
        console.log(data1); // will print your data
    } catch (error) {
        console.error(error);
    }
    
}

async function query() {
    try {
        hole.connect();
        const data = await hole.query();
        console.log(data); // will print your data
    } catch (error) {
        console.error(error);
    }

}
//conectar()
// descoenctar()
//hole.query()
//hole.disconnect()

// console.log(Config);
// conectar();
// query();