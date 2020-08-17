const express = require('express');
const router = express.Router();
const storage = require('../middleware/multer');

const multiParty = require('connect-multiparty');
const { prueba, addTarea, allTarea, upTarea, verTarea,  editTarea, byId, deleteTarea, borrar, tareaMulter } = require('../controllers/tareas.Controllers');
const galeriaMiddleware = multiParty({ uploadDir: './files/img' });
const pdfMiddleware = multiParty({ uploadDir: './files/pdf' });
const wordMiddleware = multiParty({ uploadDir: './files/words' });

router.post('/tarea',  addTarea);

router.post('/tareas', galeriaMiddleware, prueba);
router.post('/tareapdf', pdfMiddleware,  prueba);
router.patch('/tareas/:id', upTarea);
router.get('/tarea/:directory/:deber_archivo', galeriaMiddleware, verTarea);
router.delete('/tarea/:directory/:deber_archivo', galeriaMiddleware, borrar);

router.get('/tarea', allTarea);
router.get('/tarea/:id', byId);
router.patch('/tarea/:id',  editTarea);
router.delete('/tarea/:id', deleteTarea);

router.post('/tareaMulter', storage.single('file'), tareaMulter);



module.exports = router;