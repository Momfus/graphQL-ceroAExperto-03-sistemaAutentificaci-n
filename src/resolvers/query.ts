import { IResolvers } from "graphql-tools";
import JWT from "../lib/jwt";

const query : IResolvers = {
    Query : {

        // Todos los usuarios
        async users( _: void, __: any, { db } ): Promise<any> { // Los primeros dos no vamos a usar pero se necesita añadir, por lo que se usan los guion bajo (simples y doble)
    
            return await db.collection('users').find().toArray();

        },

        // Usuario especifico según email y password
        async login( _: void, { email, password }, { db } ): Promise<any> {
        
            const user = await db.collection('users').findOne( {email} );

            // Comprobar si el usuario existe o no para manejar el token
            if( user === null ) {

                return {

                    status: false,
                    message: 'Login INCORRECTO. No existe el usuario',
                    token: null

                }

            }

            // Comprobar el password de usuario
            if( password !== user.password ) {

                return  {
                    status: false,
                    message:  'Login INCORRECTO. Contraseña incorrecta',
                    token: null
                }

            }

            // Caso que haya resultado de usuario
            return {
                status: true,
                message: 'Login Correcto',
                token: new JWT().sign( {user} ) // user: user es lo mismo que solo user
            }
        
        }

    }
}

export default query;