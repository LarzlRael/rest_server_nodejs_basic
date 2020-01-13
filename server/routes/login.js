const { Router } = require('express');
const bcrypt = require('bcrypt')
const UserM = require('../models/usuario');
const jwt = require('jsonwebtoken');
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

module.exports = router;
