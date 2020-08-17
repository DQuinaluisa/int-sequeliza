const express = require('express');
const router = express.Router();
const { autentica } = require('../middleware/token');
const { crearAdm, loginAdm, verAdm, eliminarAdm, adminId, actualizarAdm } = require('../controllers/administrador.Controllers');

router.post('/adm', crearAdm);
router.get('/loginAdm', loginAdm);
router.get('/adm', autentica, verAdm);
router.delete('/adm/:id', eliminarAdm);
router.get('/adm/:id', adminId);
router.patch('/adm/:id', actualizarAdm);


module.exports = router;