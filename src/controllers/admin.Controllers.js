const { Administrador } = require('../models/index');

async function crearAdm (req, res) {
         const admin = req.body.admin;
         console.log(admin);
    try {
        const adm = await Administrador.create(admin);
        res.status(200).json(adm);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verAdm (req, res) {
    try {
        const admin = await Administrador.findAll(
            {
                attributes: ['id', 'name', 'lastname', 'email', 'password']
            },
        )
        console.log(admin);
        res.json(admin);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function eliminarAdm (req, res) {
    try {
        const admin = await Administrador.destroy({
            where: { id: req.params.id }
        }).then(result => {
            res.status(200).json(result);
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

module.exports = {
    crearAdm,
    verAdm, 
    eliminarAdm
}