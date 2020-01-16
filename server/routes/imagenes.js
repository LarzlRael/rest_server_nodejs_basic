const { Router } = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const { verificateToken, verificateTokenImg } = require('../middlewares/authentication')

router.get('/imagen/:tipo/:img', verificateToken, (req, res) => {
    let { tipo } = req.params;
    let { img } = req.params;


    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    console.log('haciendo peticion a :' + pathImagen);
    //si esta imagen existe
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen)
    } else {
        //usar la con F mayuscul y nos pide el path absoluto de la imagen
        let noImage = path.resolve(__dirname, '../assets/noimage.jpeg');
        //srive para mandar imagenes en caso de querer responder con eso
        res.sendFile(noImage);

    }


})



module.exports = router;