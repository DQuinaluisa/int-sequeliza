const { Administrador } = require('../models/index');

const  bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const { password } = require('../config/database');

async function crearAdm (req, res) {
      
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

try {
    await Administrador.create({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: password
    }).then(admin => {

        res.status(200).json({
            msg: "Creado con exito",
            admin: admin
        })

    })
} catch (error) {
    return res.status(400).json({
        msg: 'No se pudo crear',
        error
    })
}
}

async function loginAdm (req, res) {
    let { email, password } = req.body;
    await Administrador.findOne({
        where: { email:email }
    }).then(admin => {
        if (!admin) {
            res.status(404).json({ 
                msg: "Este correo no existe"
             });
        }else {
            if(bcrypt.compareSync(password, admin.password)) {

                let token = jwt.sign({ admin: admin }, authConfig.secret , {
                    expiresIn: authConfig.expires
                });

                res.json({
                    admin: admin,
                    token: token
                })

            } else { 
                res.status(401).json({
                    msg: "Contraseña incorrecta"
                })
          }
        }
    }).catch(error => {
        res.status(400).json(error);
    })
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
            error,
            token
            
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

async function adminId (req, res) {
    try {
        const admin = await Administrador.findByPk(req.params.id, {
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

async function actualizarAdm (req, res) {
    try {
        const id = req.params.id
        const admin = await Administrador.update(req.body, {
            where: { id: id }
        }).then(admin => {
            res.status(200).json({
               admin: admin,
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
    crearAdm,
    loginAdm,
    verAdm,
    eliminarAdm,
    adminId,
    actualizarAdm
}