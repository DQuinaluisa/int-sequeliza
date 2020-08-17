const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');
const { autentica } = require('../middleware/token');
const { crearEst, loginEst, estuId, verEstu, verPro, subirTarea, eliminarEstu, actualizarEstu } = require('../controllers/estudiante.Controllers');

router.post('/est', crearEst);
router.get('/loginEstu', loginEst);
router.get('/estu/:id', estuId)
router.get('/est', /*autentica,*/ verEstu);
router.post('/estarea', storage.single('file'), subirTarea);
// router.get('/est/tareas',  estu_Tareas);
router.get('/est_prof', verPro);
router.delete('/est/:id', eliminarEstu);
router.patch('/est/:id', actualizarEstu);

module.exports = router;