const express = require('express');
const router = express.Router();
const { crearMateria, verAll, verOne, deleteMater, putMater } = require('../controllers/materias.Controllers');

router.post('/mts', crearMateria);
router.get('/mts', verAll);
router.get('/mts/:id', verOne);
router.delete('/mts/:id', deleteMater);
router.patch('/mts/:id', putMater);

module.exports = router;