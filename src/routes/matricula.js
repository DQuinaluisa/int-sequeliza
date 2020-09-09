const express = require('express');
const router = express.Router();
const { newMatricula, verMatri, verOneMatri, deleteMatri, putMatri, } = require('../controllers/matriculas.Controllers');

router.post('/mtri', newMatricula);
router.get('/mtri', verMatri);
router.get('/mtri/:id', verOneMatri);
router.delete('/mtri/:id', deleteMatri);
router.patch('/mtri/:id', putMatri);

module.exports = router;