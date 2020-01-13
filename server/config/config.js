// ============================
// Entorno
// ============================
process.env.PORT = process.env.PORT || 3000

// ============================
// Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/udemy_rest_node';
} else {

    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

