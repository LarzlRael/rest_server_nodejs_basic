const mongoose = require('mongoose');
const morgan = require('morgan')
const path = require('path');
//para establecer el puerto y base de datos
require('./config/config');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(db => console.log('Base de datos mongo conectada'))
    .catch(err => console.log(err))


const express = require('express');
const app = express();
const routes = require('./routes/indexRoutes')

//parse application/json
app.use(express.json());
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// habilitar la carpeta publica para ser accedida

app.use(express.static(path.join(__dirname, '../public')));
//para ver las rutas
app.use(morgan('dev'))
app.use(routes)


app.listen(process.env.PORT, () => {
    console.log(`Entrar a: http://localhost:${process.env.PORT}`)
})