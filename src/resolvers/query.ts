import { IResolvers } from "graphql-tools";

const query : IResolvers = {
    Query : {

        // Todos los usuarios
        async users( _: void, __: any, { db } ): Promise<any> { // Los primeros dos no vamos a usar pero se necesita añadir, por lo que se usan los guion bajo (simples y doble)
    
            return await db.collection('users').find().toArray();

        },

        // Usuario especifico según email y password
        async login( _: void, { email, password }, { db } ): Promise<any> {
        
            return await db.collection('users').findOne( {email, password} ) // Los argumentos del objeto al ser igual que la propiedad (no hace falta poner email.value ), to hace falta poner al final ".toArray()"
                    .then( (result: any) => {
                        if( result === null ) {
                            return {
                                status: false,
                                message: 'Login INCORRECTO. Comprueba la información',
                                user: null
                            }
                        }
                        // Caso que haya resultado
                        return {
                            status: true,
                            message: 'Login Correcto',
                            user: result
                        }

                    } )
                    .catch( (err: any) => { // Para manejo de otro error

                        return {
                            status: false,
                            message: 'Error Inesperado',
                            user: null
                        }

                    } )
        
        
        }

    }
}

export default query;