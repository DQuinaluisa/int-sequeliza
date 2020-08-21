const express = require('express');
const router = express.Router();
const { autentica } = require('../middleware/token');
const storage = require('../middleware/multer');
const { crearPerson, verAll, loginA, eliminarPer, editarPer } = require('../controllers/personas.Controllers'); 
const Rutas = require('../middleware/rutasPersona');

router.post('/person', autentica, Rutas.crearPerson, storage.single('file'), crearPerson);
router.post('/loginP', loginA);
router.get('/person', autentica, Rutas.verAll, verAll);
router.delete('/person/:id', autentica, Rutas.eliminarPer, eliminarPer);
router.patch('/person/:id', autentica, Rutas.editarPer, editarPer);

module.exports = router;