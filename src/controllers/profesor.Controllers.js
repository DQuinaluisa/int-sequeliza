const { Profesor } = require('../models/index');
const { Estudiante } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

async function crearProfe (req, res) {
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    try {
        await Profesor.create({
            name: req.body.name,
            lastname: req.body.lastname,
            identification: req.body.identification,
            email: req.body.email,
            password: password
        }).then(profe => {
            res.status(200).json({
                msg: "Creado con exito",
                profe: profe
            })
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function loginProfe (req, res) {
    let { email, password } = req.body;

    await Profesor.findOne({
        where: { email: email }
    }).then(profe => {
        if(!profe) {
            res.status(404).json({
                msg: "Este correo no existe"
            });
        }else {
            if(bcrypt.compareSync(password, profe.password)) {

                let token = jwt.sign({ profe: profe }, authConfig.secret,
                    {expiresIn: authConfig.expires});

                    res.json({
                        profe: profe,
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

async function profeId (req, res) {
    try {
        const profe = await Profesor.findByPk(req.params.id,
            {
            attributes: ['id', 'name', 'lastname', 'identification', 'email', 'password']
            },
        )
        console.log(profe);
        res.json(profe);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
            
        })
    }
}

async function verProfe (req, res) {
    try {
        const profe = await Profesor.findAll(
            {
            attributes: ['id', 'name', 'lastname', 'identification', 'email', 'password'],
            include: [{
                association: "tareas",
                    attributes: ['id', 'deber_archivo', 'nota','profesorId']
                
            }, {
                association: "clases",
                    attributes: ['id', 'tareas_realizar', 'profesorId']
            }]
            },
        )
        console.log(profe);
        res.json(profe);
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
            attributes: ['id', 'name', 'lastname', 'identification', 'email', 'password'],
            include: [{
                association: "tareas",
                    attributes: ['id', 'deber_archivo', 'nota', 'estudianteId']
                
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


async function crearTarea (req, res){
    try {
        const tarea = await Profesor.create({
            name: req.body.name,
            lastname: req.body.lastname,
            identification: req.body.identification,
            email: req.body.email,
            password: req.body.password,
            clases: {
                tareas_realizar: req.file.path
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

async function profe (req, res) {
    try {
        const profe = await Profesor.findAll(
            {
            attributes: ['id', 'name', 'lastname', 'identification', 'email', 'password']
            },
        )
        console.log(profe);
        res.json(profe);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error,
            token
        })
    }
}

async function eliminarProfe (req, res) {
    try {
        const profe = await Profesor.destroy({
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

async function actualizarProfe (req, res) {
    try {
        const id = req.params.id
        const profe = await Profesor.update(req.body, {
            where: {
                id: id
            }
        }).then(estudiante => {
            res.status(200).json({
             profe:profe,
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
    crearProfe,
    loginProfe,
    profeId,
    verProfe,
    verEstu,
    crearTarea,
    profe,
    eliminarProfe,
    actualizarProfe
    
}