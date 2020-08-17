const express = require('express');
const router = express.Router();
const { addCursoMat, byId, allCurMat } = require('../controllers/curso_materia.Controllers');

router.post('/curmat',addCursoMat);
router.get('/curmat', allCurMat);
router.get('/curmat/:id', byId );

module.exports = router