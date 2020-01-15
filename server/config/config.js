// ============================
// Entorno
// ============================
process.env.PORT = process.env.PORT || 3000

// ============================
// Base de datos
// ============================
let urlDB;


process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/udemy_rest_node';


urlDB = process.env.MONGO_URI;


// ============================
// Vencimiento del token
// ============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30 * 2;

// ============================
// seed de autenticacion
// ============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo'

// ============================
// Goolgle Client ID
// ============================

process.env.CLIENT_ID = process.env.CLIENT_ID ||
    '181489583855-9u4ol8qr52o65grcvlaj59qh0nfkhju9.apps.googleusercontent.com'
process.env.URLDB = urlDB;

