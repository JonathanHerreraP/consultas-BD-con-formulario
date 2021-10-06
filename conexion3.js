// Importacion de modulos requeridos:
const { Pool } = require("pg");
const http = require ( "http" );
const { insertar, consultar, editar, eliminar } = require ( "./consultas" );
const fs = require ( "fs" );
const url = require('url');


// Se crea servidor, al abrir el localhost abe el index.html con fs:
http.createServer( async (req, res) => {

    if (req.url == "/" && req.method == "GET") {
        res.setHeader( "content-type" , "text/html" );
        const html = fs.readFileSync( "index.html" , "utf8" );
        res.end(html);
    }
    
    // Ruta para Insertar con metodo POST:
    if ((req.url == "/cancion" && req.method == "POST")) {
        let body = "" ;
        req.on( "data" , (chunk) => {
            body += chunk;
        });
        req.on( "end" , async () => {
            const datos = Object.values(JSON.parse(body));
            const respuesta = await insertar(datos);
            res.end(JSON.stringify(respuesta));
        });
    }
        

    // Ruta para Leer con metodo GET:
    if (req.url == "/cancion" && req.method == "GET") {
        const registros = await consultar();
        res.end(JSON.stringify(registros));
    }


    // Ruta de Editar con metodo PUT:
    if (req.url == "/cancion" && req.method == "PUT") {
            let body = "" ;
            req.on( "data" , (chunk) => {
                body += chunk;
            });
            req.on("end" , async () => {
                const datos = Object.values(JSON.parse(body));
                const respuesta = await editar(datos);
                res.end(JSON.stringify(respuesta));
            });
    }


    // Ruta para Eliminar con metodo DELETE:    
    if (req.url.startsWith("/cancion?") && req.method == "DELETE") {
        const { nombre } = url.parse(req.url,true).query;
        const respuesta = await eliminar(nombre);
        res.end(JSON.stringify(respuesta));
    }
    
// se escucha en puerto 3000:
}).listen( 3000 );

