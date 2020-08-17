const { Estudiante } = require('../models/index');
const { Profesor } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

async function crearEst (req, res) {
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    try {
        await Estudiante.create({
            name: req.body.name,
            lastname: req.body.lastname,
            identification: req.body.identification,
            email: req.body.email,
            password: password
        }).then(estu => {
            res.status(200).json({
                msg: "Creado con exito",
                estu: estu
            })
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function loginEst (req, res) {
    let { email, password } = req.body;

    await Estudiante.findOne({
        where: { email: email }
    }).then(estu => {
        if(!estu) {
            res.status(404).json({
                msg: "Este correo no existe"
            });
        }else {
            if(bcrypt.compareSync(password, estu.password)) {

                let token = jwt.sign({ estu: estu }, authConfig.secret,
                    {expiresIn: authConfig.expires});

                    res.json({
                        estu: estu,
                        token: token
                    })
            }else {
                res.status(401).json({
                    msg: "Contraseña incorrecta"
                })
            }
        }
    }).catch(error => {
        res.status(400).json(error);
    })
}

async function estuId (req, res) {
    try {
        const estu = await Estudiante.findByPk(req.params.id,
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
            error,
            token
        })
    }
}

async function verPro (req, res) {
    try {
        const estu = await Profesor.findAll(
            {
            attributes: ['id', 'name', 'lastname', 'identification', 'email', 'password'],
            include: [ {
                association: "clases",
                    attributes: ['id', 'tareas_realizar', 'profesorId']
            }]
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


async function subirTarea (req, res){
    try {
        const tarea = await Estudiante.create({
            name: req.body.name,
            lastname: req.body.lastname,
            identification: req.body.identification,
            email: req.body.email,
            password: req.body.password,
            tareas: {
                deber_archivo: req.file.path
            }
        }, {
            include: ['tareas', 'clases']
        }).then(tarea => {
            res.status(200).json(tarea)
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function estu_Tareas(req, res) {
    try {
        const estu = await Estudiante.findAll(
            {
                include: [{
                    association: "tareas",
                    attributes: ['id', 'deber_archivo', 'estudianteId']
                }]
            },
        )
        res.json(estu);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
            
        })
    }
}

async function eliminarEstu (req, res) {
    try {
        const estu = await Estudiante.destroy({
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

async function actualizarEstu (req, res) {
    try {
        const id = req.params.id
        const estudiante = await Estudiante.update(req.body, {
            where: {
                id: id
            }
        }).then(estudiante => {
            res.status(200).json({
             estudiante: estudiante,
             msg: "Actualizada con exito"
            });
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

module.exports = {
    crearEst,
    loginEst,
    estuId,
    verEstu,
    verPro,
    subirTarea,
    estu_Tareas,
    eliminarEstu,
    actualizarEstu
}