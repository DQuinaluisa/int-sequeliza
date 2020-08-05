const { Estudiante } = require('../models/index');

async function crearEst (req, res) {
    const estu = req.body.estu;
    console.log(estu);
    try {
        const est = await Estudiante.create(estu);
        res.status(200).json(est);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verEstu (req, res) {
    try {
        const estu = await Estudiante.findAll(
            {
            attributes: ['id', 'name', 'lastname', 'identification', 'email', 'password']
            },
        )
        console.log(estu);
        res.json(estu);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function eliminarEst (req, res) {
    try {
        const estu = await Estudiante.destroy({
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
    crearEst,
    verEstu,
    eliminarEst
}