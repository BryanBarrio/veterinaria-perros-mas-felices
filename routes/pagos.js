const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearPago,
        obtenerPagos,
        obtenerCarrito,
        borrarCarrito,obtenerCarritosPorUsuario } = require('../controllers/pagos');

const { existeUsuarioPorId,existeCarritoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerPagos );

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCarritoPorId ),
    validarCampos,
], obtenerCarrito );

router.get('/usuario/:idUsuario',[
    check('idUsuario', 'No es un id de Mongo válido').isMongoId(),
    check('idUsuario').custom( existeUsuarioPorId ),
    validarCampos,
], obtenerCarritosPorUsuario );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', validarJWT, crearPago);

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCarritoPorId ),
    validarCampos,
], borrarCarrito);


module.exports = router;