const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');

const { crearProf, verAll, verOne, deleteProf, putProf } = require('../controllers/profesor.Controllers');

router.post('/prof', storage.single('file'), crearProf);
router.get('/prof', verAll);
router.get('/prof/:id', verOne);
router.delete('/prof/:id', deleteProf);
router.patch('/prof/:id', putProf);

module.exports = router;