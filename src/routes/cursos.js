const express = require('express');
const router = express.Router();
const { crearCurso, verCursos, editarCurso, cursoId, eliminarCurso } = require('../controllers/cursos.Controllers');

router.post('/curso', crearCurso);
router.get('/curso', verCursos);
router.get('/curso/:id', cursoId);
router.patch('/curso/:id', editarCurso);
router.delete('/curso/:id', eliminarCurso);

module.exports = router