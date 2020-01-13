const jwt = require('jsonwebtoken');
let verificateToken = (req, res, next) => {
    //con esta variable vamos a buscar la cabezera que tiene nyuestro token
    let token = req.get('token');
    //esta funcion recibe 3 para,etros 
    //1- token
    //2- seed
    //3- callback
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }
        // en esta parte se crea un req los datos del usuario
        req.usuario = decoded.usuario;
        console.log(token);
        next();
    })
}

// ===================
// verifica AdminRole
// ===================

let verificaAdminRole = (req, res, next) => {
    console.log(req.usuario)
    let { role } = req.usuario;
    if (role != 'ADMIN_ROLE') {

        res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
    next();

}



module.exports = { verificateToken, verificaAdminRole };