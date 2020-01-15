const { Router } = require('express');
const router = Router();
let { verificateToken, verificaAdminRole } = require('../middlewares/authentication')
const ProductoM = require('../models/producto');

// ========================
// Obtener el producto
// ========================

router.get('/productos', async (req, res) => {
    // *traer todos
    // *populate
    // paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);
    const allProducts = await ProductoM.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario categoria');
    res.json(allProducts);
})
// ========================
// Obtener el producto por ID
// ========================

router.get('/productos/:id', verificateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await ProductoM.findById(id)
            .populate('usuario categoria');
        res.json(producto);
    } catch (error) {
        res.status(400).json({ errors: 'no existe el id', error });
    }
    //usuario
    //categoria
})
// ========================
// Crear el producto
// ========================

router.post('/productos', verificateToken, async (req, res) => {

    //crear nuevo prudcto
    const { nombre, precioUni, descripcion, disponible, categoria } = req.body;

    const id = req.usuario._id;
    let newProducto = new ProductoM({
        usuario: id,
        nombre,
        precioUni,
        descripcion,
        disponible,
        categoria

    });
    //console.log(newProducto)
    try {
        const pro = await newProducto.save();
        res.status(201).json({
            ok: true,
            pro
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }

    //categoria
})
// ========================
// Actualizar un producto
// ========================

router.put('/productos/:id', verificateToken, async (req, res) => {

    //actualizar
    //categoria
    const { id } = req.params;
    const { nombre, precioUni, descripcion, disponible, categoria } = req.body;
    const id_user = req.usuario._id;
    let editProducto = {
        usuario: id_user,
        nombre,
        precioUni,
        descripcion,
        disponible,
        categoria

    };
    //console.log(newProducto)
    try {
        const pro = await ProductoM.findOneAndUpdate(id, editProducto)
        res.status(201).json({
            ok: true,
            message: 'producto editado correctamente'
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
})
// ========================
// Eliminar un producto
// ========================

router.delete('/productos/:id', verificateToken, async (req, res) => {

    //Eliminar (pero no fisicamente)
    const { id } = req.params;
    try {
        await ProductoM.findByIdAndUpdate(id, { disponible: false });
        res.json({
            edit: true,
            message: 'Producto eliminado (pero no fisicamente)'
        })
    } catch (error) {
        res.status(500).json({ errors: 'no existe el id', error })
    }
    //categoria
})

// =========================
// Metodo para poder buscar
// =========================
router.get('/productos/buscar/:termino', verificateToken, async (req, res) => {
    let { termino } = req.params;
    //para poder usar esto vamos usar expresiones regulares
    //la ia es para que no sea sensible a las mayusculas y minusculas
    
    try {
        //RegExp es para poder hacer las expresiones regulares
        // ademas buscara cualquier cosa que coincida
        let regex = new RegExp(termino, 'i');
        const buscar = await ProductoM.find({nombre:regex})
            .populate('categoria usuario');
        res.json(buscar)
    } catch (error) {
        res.status(500).json({ error })
    }
})
module.exports = router;
