const { Curso } = require('../models/index');


async function crearCurso(req, res) {
    try {
        const curso = await Curso.create({
            nombre_curso: req.body.nombre_curso,
            paralelos: {
                nombre_paralelo: req.body.nombre_paralelo
            }
        }, {
            include: ['paralelos']
        }).then(curso => {
            res.status(200).json(curso);
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function editarCurso(req, res) {
    try {
        const id = req.params.id
        const curso = await Curso.update(req.body, {
            where: {
                id: id
            }
        }).then(curso => {
            res.status(200).json(curso);
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function cursoId(req, res) {
    try {
        const course = await Curso.findByPk(req.params.id, {
            include: {
                association: "paralelos",
                attributes: ['id', 'nombre_paralelo', 'cursoId']
            }
        })
        res.json(course);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verCursos(req, res) {
    try {
        const course = await Curso.findAll(
            {
                include: {
                    association: "paralelos",
                    attributes: ['id', 'nombre_paralelo', 'cursoId']
                }
            },
        )
        console.log(course);
        res.json(course);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function eliminarCurso(req, res) {
    try {
        const curso = await Curso.destroy({
            where: { id: req.params.id }
           
        }).then(result => {
            res.status(200).json(result);
        })
        console.log(estu);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

module.exports = {
    crearCurso,
    verCursos,
    editarCurso,
    eliminarCurso,
    cursoId
}