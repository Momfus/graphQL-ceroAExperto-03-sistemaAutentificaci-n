import MongoClient from 'mongodb';
import chalk from 'chalk'

class Database {

    // Crear la referencia a la base de datos MongoDB
    async init() {

        const MONGODB = String(process.env.DATABASE);
        const client = await MongoClient.connect( MONGODB, { useNewUrlParser: true, useUnifiedTopology: true } );

        const db = await client.db(); // Esperar que tenga la información del cient para levantarse la base de datos

        // Dar el nombre de la base de datos a escuchar
        if( client.isConnected() ) {
            
            console.log('========== DATABASE ==========');
            console.log(`STATUS: ${chalk.greenBright('ONLINE')}`);
            console.log(`DATABASE: ${chalk.greenBright(db.databaseName)}`);
            

        }

        return db;

    }

}

export default Database;