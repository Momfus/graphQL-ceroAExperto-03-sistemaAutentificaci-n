import { IResolvers } from "graphql-tools";
import { Datetime } from "../lib/datetime";

const mutation : IResolvers = {
    Mutation : {
        async register( _: void, { user }, { db }): Promise<any> {

            const lastUser = await db.collection('users').find().limit(1).sort({ registerDate: -1 }).toArray(); // Buscar el último usuario conectado (con el último elmento introducido, se coloca -1 para hacer descendente)
                   
            // De no haber más usuario, se coloca el primer número, de haber habido más, se aumenta en uno su ID
            if( lastUser.length === 0 ) {
                user.id = 1;
            } else {
                user.id = lastUser[0].id + 1;
            }
            
            // Fecha de registro
            user.registerDate = new Datetime().getCurrentDateTime();
            
            // Agregar el nuevo elemento
            await db.collection('users').insertOne(user);

            return user;

        }
    }
}

export default mutation;