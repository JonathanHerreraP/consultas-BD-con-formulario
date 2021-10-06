
//Se importa pg:
const { Pool } = require("pg");

// Configuracion para base de datos:
const config = {
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "repertorio",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
};

// New Pool para consultas:
const pool = new Pool(config);

//Funcion asincrona para Insertar nueva cancion:
const insertar = async (datos) => {
    const consulta = {
        text: "INSERT INTO repertorio values($1, $2, $3)" , 
        values: datos 
    };
    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {
        console .log(error.code);
        return error;
    }
};

//Funcion asincrona para leer:
const consultar = async () => {
    try {
        const result = await pool.query("SELECT * FROM repertorio");
        return result;
    } catch (error) {
        console .log(error.code);
        return error;
    }
};

//Funcion asincrona para editar canciones:
const editar = async (datos) => {
    const consulta = {
        text: `UPDATE repertorio SET cancion = $1, artista = $2, tono = $3 WHERE cancion = $1 RETURNING *` ,
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        console .log(result);
        return result;
    } catch (error) {
        console .log(error);
        return error;
    }
};


//Funcion asincrona para eliminar cancion:
const eliminar = async (cancion) => {

    console.log("la cancion eliminada es: ", cancion);
    try {
        const result = await pool.query(`DELETE FROM repertorio WHERE cancion = '${cancion}'`);
        return result;
    } catch (error) {
        console .log(error.code);
        return error;
    }
};
    
    
// Se exportan las funciones:
module .exports = { insertar, consultar, editar, eliminar };
    