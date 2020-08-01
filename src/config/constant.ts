// Fichero de constante para la clave secreta

import environments from './environment';


 // Establecer abmiente de no ser ambiente de producción
 if( process.env.NODE_END !== 'production') {

    const envornment = environments;

}


export const SECRET_KEY = process.env.SECRET || "MomfusArboleo"; // Usar la clave secreta o sino usar una por defecto para probar en ambiente local
