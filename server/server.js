const mongoose = require('mongoose');
const morgan = require('morgan')

//para establecer el puerto y base de datos
require('./config/config');

mongoose.connect('mongodb://localhost/udemy_rest_node', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log('Base de datos mongo conectada'))
    .catch(err => console.log(err))


const express = require('express');
const app = express();
const routes = require('./routes/indexRoutes')

//parse application/json
app.use(express.json());
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//para ver las rutas
app.use(morgan('dev'))
app.use(routes)

app.listen(process.env.PORT, () => {
    
    console.log(`Entrar a: http://localhost:${process.env.PORT}`)
})