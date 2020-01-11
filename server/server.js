//para establecer el puerto
require('./config/config');

const express = require('express');
const app = express();


//parse application/json
app.use(express.json());
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    res.json('hola mundo :D')
})
app.get('/getusers', (req, res) => {
    res.json('get_usuarios')
})

app.post('/getusers/:id', (req, res) => {
    const { id } = req.params;
    console.log(`el id es : ${id}`)
    res.json('hiciste una peticio post')
})
app.post('/user',(req,res)=>{
    const body = req.body;
    res.json(body)
})

app.listen(process.env.PORT, () => {
    console.log('escuchando desde el puerto : ' + process.env.PORT);
    console.log(`entrar a http://localhost:${process.env.PORT}`)
})