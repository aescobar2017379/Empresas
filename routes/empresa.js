//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { postEmpresa, putEmpresa, getEmpresas, deleteEmpresa, putSucursalEmpresa } = require('../controllers/empresa');
const { esTipoValido, emailExiste } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getEmpresas);

router.post('/agregarEmpresa', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('tipo').default('SOCIEDAD_ANONIMA').custom(esTipoValido),
    validarCampos
] , postEmpresa);

router.put('/editarEmpresa', [
    validarJWT,

    validarCampos
] , putEmpresa);

router.delete('/eliminarEmpresa', [
    validarJWT,
    validarCampos
] , deleteEmpresa);


module.exports = router;

