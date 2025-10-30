import sql from 'mssql';

const dbConfig = {
    server: 'michef.database.windows.net',
    database: 'MiChef',
    user: 'AzureAdmin',
    password: 'MiChef2025',
    options: {
        encrypt: true,  // Para conexiones Azure
        trustServerCertificate: false,
        connectTimeout: 30000, // 30 segundos
        requestTimeout: 30000
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Pool de conexiones con manejo de errores mejorado
const pool = new sql.ConnectionPool(dbConfig);
let poolConnect = null;

// Función para obtener la conexión
async function getConnection() {
    try {
        if (!poolConnect) {
            console.log('Iniciando conexión a Azure SQL Database...');
            poolConnect = pool.connect();
        }
        await poolConnect;
        console.log('Conexión a BD establecida');
        return pool;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        poolConnect = null; // Reset para reintentar en la próxima llamada
        throw error;
    }
}

// Manejar errores del pool
pool.on('error', err => {
    console.error('Error en el pool de conexiones:', err);
    poolConnect = null;
});

// Función para ejecutar queries
export async function executeQuery(query, params = []) {
    try {
        const connection = await getConnection();
        const request = connection.request();
        
        // Añade los parámetros si existen
        params.forEach((param, index) => {
            request.input(`param${index}`, param);
        });

        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error('Error ejecutando query:', error.message);
        throw error;
    }
}

// Para cerrar la conexión cuando la app se cierre
process.on('SIGINT', () => {
    console.log('Cerrando conexión a BD...');
    pool.close();
    process.exit(0);
});

export default {
    executeQuery,
    pool
};