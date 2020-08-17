const express = require('express');
const router = express.Router();
const { crearParalelo, /*paralelo,*/ editParalelo, paraleloId, verParalelo, eliminarParalelo } = require('../controllers/paralelos.Controllers');

router.post('/prl', crearParalelo);
// router.post('/prlo', paralelo);
router.get('/prl',  verParalelo);
router.get('/prl/:id', paraleloId);
router.patch('/prl/:id', editParalelo);
router.delete('/prl/:id', eliminarParalelo);

module.exports = router