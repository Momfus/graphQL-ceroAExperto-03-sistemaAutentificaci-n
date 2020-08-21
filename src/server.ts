import express from 'express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import environments from './config/environment';
import Database from './config/database';

// De estar en desarrollo, establecer el ambiente orrespondiente
if( process.env.NODE_ENV !== 'production') {

    const envs = environments;

}

// Establecer función asincrona para hacer en paralelo al levantar el ambiente
async function init() {

    
    const app = express();
    
    app.use('*', cors());
    
    app.use(compression());
    
    // Comenzar conexión a la base de datos
    const database = new Database();
    const db = await database.init();  // Esperar que se inicia

    // Conexto de graphql
    const context: any = async( {req, connection}: any ) => {

        const token = req ? req.headers.authorization : connection.authorization; //  se envia el token dentro del contexto con la información de las cabeceras o la conección

        return { db, token }; // Permite que cualquier resolver utilice esto (primer parámetro información del padre, segundo del argumento y tercero del context)

    };

    // Iniciar conexión a ApolloServer
    const server = new ApolloServer({
        schema,
        context,
        introspection: true
    });
    
    server.applyMiddleware({ app });
    
    const PORT = process.env.PORT || 5300; // De no usar la varible de entorno, usar 5300
    const httpServer = createServer(app);
    httpServer.listen(
        { port : PORT },
        () => console.log(`Sistema de Autenticación JWT API GraphQL http://localhost:${PORT}/graphql`)
    );

}

init();