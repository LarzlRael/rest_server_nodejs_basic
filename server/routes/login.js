const { Router } = require('express');
const bcrypt = require('bcrypt')
const UserM = require('../models/usuario');
const jwt = require('jsonwebtoken');

// librerias para poder usar google con nuestra aplicacion

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const router = Router();

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    console.log('email : ' + email)
    try {
        const userDb = await UserM.findOne({ email });
        if (!userDb) {
            res.status(400).json({ error: 'Usuario no encontrado' });
        }
        if (!bcrypt.compareSync(password, userDb.password)) {
            res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrecto'
                }
            });
        }
        // aqui es donde vamos generar nuestr jwt encaso de que no haya problemas xD
        let token = jwt.sign({
            usuario: userDb
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
        res.json({
            ok: true,
            userDb,
            token: '123',
            token
        })

    } catch (error) {
        res.status(400).json(error);
    }
})

//configuracion de Google

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    //const userid = payload['sub'];
    // console.log(payload.name)
    // console.log(payload.email)
    // console.log(payload.picture)
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

//ruta para poder entrar con google
router.post('/google', async (req, res) => {

    let token = req.body.idtoken;
    console.log(req.body);
    
    console.log('token recibido : ' + token);
    
    let googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        });

    // res.json({
    //     usuario: googleUser
    // })
    try {
        const usuarioDB = await UserM.findOne({ email: googleUser.email });
        console.log('usuario de google' + googleUser.email)
        if (usuarioDB) {
            if (usuarioDB.google === false) {
                return res.status(400).json({
                    message: 'Usa tu cuenta ya fue creada, usela '
                })
            } else {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            }
        } else {
            //si el usuario no existe en la base de datos
            let usuario = new UserM();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.role = 'USER_ROLE'
            usuario.password = ':)';

            try {
                await usuario.save();
                let token = jwt.sign({
                    usuario: userDb
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            } catch (error) {
                res.status(500).json(error)
            }
        }
    } catch (error) {
        res.status(500).json({ error })
    }

})

module.exports = router;
