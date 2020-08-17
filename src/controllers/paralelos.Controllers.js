const { Paralelos } = require('../models/index');



async function crearParalelo (req, res) {
    try {
        const paralelo = await Paralelos.create({
            nombre_paralelo: req.body.nombre_paralelo
        }).then(paralelo => {
            res.status(200).json(paralelo);
        })  
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function editParalelo(req, res) {
    try {
        const id = req.params.id
        const paralelo = await Paralelos.update(req.body, {
            where: {
                id: id
            }
        }).then(paralelo => {
            res.status(200).json(paralelo);
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function paraleloId(req, res) {
    try {
        const paralelo = await Paralelos.findByPk(req.params.id, {
            include: {
                association: "cursos",
                attributes: ['id', 'nombre_curso',]
            }
        })
        res.json(paralelo);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verParalelo(req, res) {
    try {
        const paralelo = await Paralelos.findAll(
            {
                include: {
                    association: "cursos",
                    attributes: ['id', 'nombre_curso']
                }
            },
        )
        res.json(paralelo);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function eliminarParalelo(req, res) {
    try {
        const paralelo = await Paralelos.destroy({
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
   crearParalelo,
//    paralelo,
   editParalelo,
   paraleloId,
   verParalelo,
   eliminarParalelo
}