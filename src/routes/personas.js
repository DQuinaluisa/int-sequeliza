const express = require('express');
const router = express.Router();
const { autentica } = require('../middleware/token');
const storage = require('../middleware/multer');
const { crearPerson, verAll, loginA, eliminarPer, editarPer, verEstudiante, verAdmin, verProfesor, login } = require('../controllers/personas.Controllers'); 
const Rutas = require('../middleware/rutasPersona');


// router.get('/verEstu', verEstudiante );
// router.get('/verProfe', verProfesor );
// router.get('/verAdm', verAdmin ); 

// router.post('/person', storage.single('file'), crearPerson);
router.post('/login', loginA);

// router.post('/login', login);

// router.get('/person', autentica, Rutas.verAll, verAll);
// router.delete('/person/:id', autentica, Rutas.eliminarPer, eliminarPer);
// router.patch('/person/:id', autentica, Rutas.editarPer, editarPer);

module.exports = router;