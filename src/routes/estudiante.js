const express = require('express');
const router = express.Router();
const { crearEst, verEstu, eliminarEst } = require('../controllers/estudiante.Controller');




router.post('/est', crearEst);
router.get('/est', verEstu);
router.delete('/est/:id', eliminarEst);


module.exports = router;