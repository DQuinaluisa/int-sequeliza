const { Personas } = require('../models/index');


const  bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');



async function  crearPerson (req, res){
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

    try {
        await Personas.create({
            name: req.body.name,
            lastname: req.body.lastname,
            identification: req.body.identification,
            email: req.body.email,
            password: password,
            img: req.file.path,
            roles : {
                role: req.body.role
            }
        }, {
            include: ['roles']
        }
        ).then(person => {
    
            res.status(200).json({
                msg: "Creado con exito",
                person: person
            })
    
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function loginA (req, res) {
    let { email, password } = req.body;
  const prueba =   await Personas.findOne({
        where: { email: email }
    }).then(person => {
        if (!person) {
            res.status(404).json({ 
                msg: "Este correo no existe"
             });
        }else {
            if(bcrypt.compareSync(password, person.password)) {

                let token = jwt.sign({ person: person }, authConfig.secret , {
                    expiresIn: authConfig.expires
                });

                res.json({
                    person: person,
                    token: token
                })
 
            } else { 
                res.status(401).json({
                    msg: "Contraseña incorrecta"
                })
          }
        }
        console.log(prueba)
    }).catch(error => {
        res.status(400).json(error);
    })
}

async function verAll (req, res) {
    try {
        const admin = await Personas.findAll(
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

async function eliminarPer (req, res) {
    try {
        const person = await Personas.destroy({
            where: { id: req.params.id }
        }).then(result => {
            res.status(200).json(result);
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error,
            token
        })
    }
}

async function editarPer (req, res){
    try {
        const id = req.params.id
      
        const person = await Personas.update(req.body, {
            where: {
                id: id
            }
        }).then(person => {
            res.status(200).json(person);
            console.log(person)
           
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error,
            token
        })
    }
}

module.exports = {

    crearPerson,
    loginA,
    verAll,
    editarPer,
    eliminarPer
}