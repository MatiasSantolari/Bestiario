//En este archivo vamos a estructurar una respuesta estandar para los clientes


//Traigo el paquete de http-errors que nos va a permitir crear errores para poder enviarlos. Solo errores!
const createError = require('http-errors');



//Importo el objeto Response
module.exports.Response = {


    //Este atributo es para el caso de que tengamos una respuesta exitosa. Esta función va a 
    //recibir como parámetros: 1ero el objeto de respuesta para estructurarlo aquí dentro, 
    //y 2do, un status ó statusCode, 3ero un mensaje, y 4to un body o cuerpo de la respuesta. 

    //Por defecto asigno valores a status, message y body, por si no se recibe nada en alguno de ellos.

    success: (res, status = 200, message = "Ok", body = {} ) => {
        res.status(status).json({message, body});
    }, 


    //Esto es para una respuesta en caso de errores. Recibe como parámetros: 1ero el objeto de respuesta 
    //para estructurarlo aquí dentro, 2do el error que lo cargamos con un valor por defecto.

    error: (res, error = null) => {
        
        //Desetructuro esto desde un error que me retorne http-errors(paquete de arriba de todo).
        //Observar que se usa operador ternario, el cual me va a ayudar a mostrar el error que 
        //recibo como parámetro (error = null), o bien por defecto va a mostrar el InternalServerError
        //(creado aquí abajo).

        const { statusCode, message } = error ? error : new createError.InternalServerError();
        //La condición exhibida en la línea anterior se interpreta:
        
        //"Cuando exista un error como parámetro, que se utilice ese, de lo 
        //contrario, que se genere un nuevo error que sea InternalServerError()".


        //Y envío la respuesta por un json que contiene el mensaje de error.
        res.status(statusCode).json({message});
    }



}