const { Router } = require('express')
const router = Router();
const UsuarioM = require('../models/usuario');
const { verificateToken, verificaAdminRole } = require('../middlewares/authentication');
const _ = require('underscore');
const bcrypt = require('bcrypt')

// middelwares que se usan en las rutas
const middelwares = [verificateToken, verificaAdminRole];

router.get('/', (req, res) => {
    res.json('hola mundo :D')
})
// para hacer referencia a un paginacio de la base de datos
router.get('/users', verificateToken, async (req, res) => {
    // query es para hacer parametros opcionales
    // return res.json({
    //     usuario: req.usuario,
    //     nombre: req.usuario.nombre,
    //     email: req.usuario.email
    // })

    let from = req.query.from || 0;
    from = Number(from);
    //De esta forma se usa =>  http://localhost:3000/user?from=10

    //para poder hacer un limite
    let limit = req.query.limit || 5;
    limit = Number(limit);
    try {
        //para poder ver los 5 
        // the names that appears the show condition
        // para ver los usuario con el state en true
        const allUsers = await UsuarioM.find({ estado: true }, 'nombre email role estado google img')
            .skip(from)
            .limit(limit).exec();
        //para retornar
        const count = await UsuarioM.countDocuments({ estado: true });
        res.status(200).json({
            ok: true,
            count,
            allUsers,
        });
    } catch (error) {
        res.status(400).json(error)
    }

})

router.post('/getusers/:id', (req, res) => {
    const { id } = req.params;
    console.log(`el id es : ${id}`)
    res.json('hiciste una peticion post')
})
//para poder usar mas de 1 middelware se debe poner entre corchetes
// primero que verifique el token
router.post('/user', async (req, res) => {

    const { nombre, email, password, role, } = req.body;
    let usuario = new UsuarioM({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        role
    });
    try {
        const userCreated = await usuario.save();
        res.json(userCreated)
    } catch (error) {
        res.status(403).send(error)
    }
})

router.put('/user/:id', middelwares, async (req, res) => {
    let { id } = req.params;

    const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    try {
        //cuando le ponemos new true va a mostrar el usuario actualizado despues de haber hecho la peticion
        //el run validator sirve para hacer las validacionnes del modelo
        const userUpdated = await UsuarioM.findOneAndUpdate(id, body, { new: true })
        res.json({ userUpdated })
    } catch (error) {
        res.status(400).send(error)
    }

})
// eliminar el registro
// eliminado fisicamente
router.delete('/user/:id', middelwares, async (req, res) => {
    let { id } = req.params;
    try {
        const UserDelete = await UsuarioM.findByIdAndDelete(id);
        if (!UserDelete) {
            res.status(400).json({ error: 'Usuario no existe en la base de datos' })
        } else {
            res.status(200).json({ usuario: 'usuario borrando fisicamente' })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})
// metodo para ver ocultar pero no eliminar
router.delete('/delete/:id', middelwares, async (req, res) => {
    let { id } = req.params;
    let cambiaEstado = {
        estado: false
    }
    try {
        const UserDelete = await UsuarioM.findOneAndUpdate(id, cambiaEstado, { new: true });
        res.status(200).json({ usuario: 'usuario borrado (pero no fisicamente)' })

    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router;