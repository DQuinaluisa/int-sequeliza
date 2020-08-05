const express = require('express');
const router = express.Router();
const { crearAdm, verAdm, eliminarAdm } = require('../controllers/admin.Controllers');




router.post('/adm', crearAdm);
router.get('/adm', verAdm);
router.delete('/adm/:id', eliminarAdm);


module.exports = router;