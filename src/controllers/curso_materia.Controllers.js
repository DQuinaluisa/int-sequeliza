const { Cursos_Materia } = require('../models/index');

async function addCursoMat (req, res){
    try {
        const cumate = await Cursos_Materia.create({
            curso : {
                nombre_curso: req.body.nombre_curso
            },
            materias : {
                nombre_materia: req.body.nombre_materia
            },
            tareass : {
                deber_archivo: req.body.deber_archivo
                
            },
            class : {
                tareas_realizar: req.body.tareas_realizar
                
                
            }
            

        }, {
            include: [ 'curso', 'materias', 'tareass', 'class' ]
        }).then(cumate => {
            res.status(200).json(cumate);
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function byId(req, res) {
    try {
        const pmateria = await Paralelo_x_materia.findByPk(req.params.id, {
            include: [{
                association: "curso",
                attributes: ['id', 'nombre_curso']
            },{
                association: "materias",
                attributes: ['id', 'nombre_materia']
            }, {
                association: "tareass",
                attributes: ['id', 'deber_archivo']
            },{
                association: "class",
                attributes: ['id', 'tareas_realizar']
                
            }]
        })
        res.json(pmateria);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function allCurMat(req, res) {
    try {
        const pmateria = await Cursos_Materia.findAll({
           attributes: ['id', 'cursosId', 'materiasId',  'tareasId', 'clasesId'],
            include : [{
                association : "curso",
                  attributes: ['id', 'nombre_curso']
            }, {
                association : "materias",
                attributes: ['id', 'nombre_materia']
            }, {
                association : "tareass",
                attributes: ['id', 'deber_archivo', 'profesorId']
            }, {
                association : "class",
                attributes: ['id', 'tareas_realizar']
            }]
        })
        res.json(pmateria);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

module.exports = {
    addCursoMat,
    byId,
    allCurMat
}
