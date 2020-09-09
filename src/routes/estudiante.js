const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');

const { crearEstu, verAll, verOne, deleteEstu, putEstu } = require('../controllers/estudiante.Controllers');

router.post('/estu', storage.single('file'), crearEstu);
router.get('/estu', verAll);
router.get('/estu/:id', verOne);
router.delete('/estu/:id', deleteEstu);
router.patch('/estu/:id', putEstu);

module.exports = router;