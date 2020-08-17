const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');
const { autentica } = require('../middleware/token');
const { crearProfe, loginProfe, profeId, verProfe, verEstu, crearTarea, profe, eliminarProfe, actualizarProfe } = require('../controllers/profesor.Controllers');

router.post('/prf', crearProfe);
router.get('/loginProfe', loginProfe);
router.get('/prf/:id', profeId)
router.get('/prf',  verProfe);
router.get('/prf_estu', verEstu);
router.post('/proTarea', storage.single('file'), crearTarea);
router.get('/prfs', autentica,  profe);
router.delete('/prf/:id', eliminarProfe);
router.patch('/prf/:id', actualizarProfe);

module.exports = router;