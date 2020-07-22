 // Archivo para leer las variables de entorno y configurar ambientes
 
 import dotenv from 'dotenv'; // Dependencias para leer variables de entorno ( se instala con npm i dotenv ) y para usar typescript con el mismo npm i @types/dotenv -D

 const environments = dotenv.config({ path: './src/.env' });


 // EN caso de haber un error al usar el ambiente
if( process.env.NODE_END !== 'production') {

    if( environments.error ) {

        throw environments.error;

    }

}

 export default environments;