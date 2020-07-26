import { IResolvers } from "graphql-tools";

const query : IResolvers = {
    Query : {
        async users( _: void, __: any, { db } ): Promise<any> { // Los primeros dos no vamos a usar pero se necesita añadir, por lo que se usan los guion bajo (simples y doble)
    
            return await db.collection('users').find().toArray();

        }

    }
}

export default query;