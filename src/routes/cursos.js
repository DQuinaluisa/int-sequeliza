const express = require('express');
const router = express.Router();
const Rutas = require('../middleware/rutasCursos');
const { autentica } = require('../middleware/token');
// const { crearClase, find, verClases, eliminar, editar } = require('../controllers/clases.Contrallers');

const { crearCurso, verCursos, verParalelo, eliminar, editar } = require('../controllers/cursos.Controllers');


router.post('/curso', crearCurso);
router.get('/cursos', verCursos);
// router.get('/paralelos', verParalelo);
router.delete('/curso/:id', eliminar);
router.patch('/curso/:id', editar  );

// router.post('/clases', /*autentica, Rutas.crearCurso,*/ crearClase);
// router.get('/clases', autentica, Rutas.verCursos, verClases)
// router.delete('/clases/:id', autentica, Rutas.eliminar, eliminar);
// router.patch('/clases/:id', autentica, Rutas.editar, editar);

module.exports = router;