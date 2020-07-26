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
    console.log( envs );
    

}

// Establecer función asincrona para hacer en paralelo al levantar el ambiente
async function init() {

    
    const app = express();
    
    app.use('*', cors());
    
    app.use(compression());
    
    // Comenzar conexión a la base de datos
    const database = new Database();
    const db = await database.init();  // Esperar que se inicia

    // Iniciar conexión a ApolloServer
    const server = new ApolloServer({
        schema,
        introspection: true
    });
    
    server.applyMiddleware({ app });
    
    const PORT = process.env.PORT || 5300; // De no usar la varible de entorno, usar 5300
    const httpServer = createServer(app);
    httpServer.listen(
        { port : PORT },
        () => console.log(`Hola Mundo API GraphQL http://localhost:${PORT}/graphql`)
    );

}

init();