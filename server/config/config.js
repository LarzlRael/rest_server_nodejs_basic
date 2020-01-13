// ============================
// Entorno
// ============================
process.env.PORT = process.env.PORT || 3000

// ============================
// Base de datos
// ============================
let urlDB;

// if(process.env.NODE_ENV === 'dev'){
//     urlDB = 'mongodb://localhost/udemy_rest_node';
// }else{
urlDB = 'mongodb+srv://larz:fantasticbaby@cluster0-t32kh.mongodb.net/cafe-udemy?retryWrites=true&w=majority';
//}

process.env.URLDB = urlDB;
console.log('valor de la cadena de conexion ' + process.env.URLDB)
