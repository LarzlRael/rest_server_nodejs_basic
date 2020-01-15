const { Router } = require('express');
const router = Router();
let { verificateToken, verificaAdminRole } = require('../middlewares/authentication')
const CategoriaM = require('../models/categoria');
//===================================
//mostrar todas las cateogorias
//===================================

const middlewares = [verificateToken, verificaAdminRole];

router.get('/categorias', async (req, res) => {
    try {
        // el populate sirve para llenar los datos de otra tabla atraves del id
        const allCategories = await CategoriaM.find()
        .sort('descripcion')
        .populate('usuario','nombre email'); // nombre y email solo es seleccionnar que es lo que queremos ver
        res.json({
            res: true,
            allCategories
        })
    } catch (error) {
        res.status(400).json(error);
    }
})

//===================================
//mostrar las categorias por ID
//===================================

// mostrar una  categoria por id
router.get('/categoria/:id', verificateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const findOne = await CategoriaM.findById(id);
        res.json({
            ok: true,
            findOne
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

//===================================
//Crear un nueva categoria
//===================================

router.post('/categoria/', verificateToken, async (req, res) => {
    //regresa la nueva categoria
    const { descripcion } = req.body;
    const id = req.usuario._id;
    // console.log('el id es :'+id)
    // console.log('\nla descripcion es   :'+descripcion)
    const newCategoria = new CategoriaM({
        descripcion,
        usuario: id
    });
    console.log(newCategoria)
    try {
        const nuevaCategoria = await newCategoria.save();
        res.json({ created: true, nuevaCategoria })
    } catch (error) {
        res.status(400).json(error)
    }
    req.usuario._id
})
//===================================
//Actualizar nuestra cateogoria (suficente con la descripction)
//===================================

router.put('/categoria/:id', verificateToken, async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;
    const id_user = req.usuario._id;

    try {
        await CategoriaM.findOneAndUpdate(id, {
            descripcion,
            usuario: id_user
        });
        res.json({ ok: true, message: 'Categoria actualizada ' });
    } catch (error) {
        res.status(400).json(error)
    }
})

//===================================
//Eliminar fisicamente nuestra categoria
//===================================

router.delete('/categoria/:id', middlewares, async (req, res) => {
    //regresa la nueva categoria
    const { id } = req.params;
    await CategoriaM.findOneAndRemove(id);
    res.json({ ok: true, message: 'Categoria eliminada fisicamente' });
    //req.usuario._id    
});


module.exports = router;
