const { Personas, Profesor } = require('../models/index');


const  bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');



// async function  crearPerson (req, res){
//     let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

//     try {
        
//         await Personas.create({
//             name: req.body.name,
//             lastname: req.body.lastname,
//             identification: req.body.identification,
//             correo: req.body.correo,
//             password: password,
//             // img: req.file.path,
//             roles : {
//                 role: req.body.role
//             }
//         }, {
//             include: ['roles']
//         }
//         ).then(person => {
    
//             res.status(200).json({
//                 msg: "Creado con exito",
//                 person: person
//             })
    
//         })
//     } catch (error) {
//         return res.status(400).json({
//             msg: 'No se pudo crear',
//             error
//         })
//     }
// }


async function crearPerson (req, res) {
    let clave = bcrypt.hashSync(req.body.clave, Number.parseInt(authConfig.rounds));
    try {
        await Personas.create(
            {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                identificacion: req.body.identificacion,
                direccion: req.body.direccion,
                fechaNacimiento: req.body.fechaNacimiento,
                correo: req.body.correo,
                telefono: req.body.telefono,
                contactoEmergencia: req.body.contactoEmergencia,
                img: req.file.path
               

            }.then(person => {
    
                res.status(200).json({
                    msg: "Creado con exito",
                    person: person
                })
        
            })
        )
    } catch (error) {
        
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })

    }
}


async function loginA (req, res) {
    let { correoInst, clave } = req.body;
  const prueba =   await Profesor.findOne({
        where: { correoInst: correoInst }
    }).then(person => {
        if (!person) {
          return  res.status(404).json({ 
                msg: "Este correo no existe"
             });
        }else {
            if(bcrypt.compareSync(clave, person.clave)) {

                let token = jwt.sign({ person: person }, authConfig.secret , {
                    expiresIn: authConfig.expires
                });

              return  res.json({
                    person: person,
                    token: token
                })
 
            } else { 
             return  res.status(401).json({
                    msg: "Contraseña incorrecta"
                })
          }
        }
        console.log(prueba)
    }).catch(error => {
       return res.status(400).json(error);
    })
}
 


async function login (req, res) {    
    const { correo, clave } = req.body
    
     const person =  await  Personas.findOne({
         where: { correo: correo }
     })          
   try {
    if(person){
        const contra =  bcrypt.compareSync(clave, person.clave ) 
        if(contra) {
            console.log('si vale la contraseña')
            console.log(clave )
            const token = jwt.sign({ person : person }, authConfig.secret, {
                expiresIn: authConfig.expires
            })
            console.log(token)
            res.status(200).json({      
                token
            })
        }else {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'    
            })
        } 
      
    }else if(!person) {
        return res.status(400).json({
            msg: 'Usuario no encontrado'       
        })
    }
   } catch (error) {
    return res.status(400).json({
        msg: 'No se pudo crear',
        error
    })
   }
   
}

async function verAdmin (req, res) {
    try {
        const person = await Personas.findAll({
            attributes: ['id', 'name', 'identification', 'lastname', 'correo', 'clave'],
            include: [{
                association: "roles",
                where: { role : 'admin' }
            }]
            
        })
        console.log(person);
        res.json(person);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verProfesor (req, res) {
    try {
        const person = await Personas.findAll({
            attributes: ['id', 'name', 'identification', 'lastname', 'correo', 'clave'],
            include: [{
                association: "roles",
                where: { role : 'profesor' }
            }]
            
        })
        console.log(person);
        res.json(person);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verEstudiante (req, res) {
    try {
        const person = await Personas.findAll({
           attributes: ['id', 'name', 'identification', 'lastname', 'correo', 'clave'],
            include: [{
                association: "roles",
                where: { role : 'estudiante' }
            }]
            
        })
        console.log(person);
        res.json(person);
        
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function verAll (req, res) {
    try {
        const admin = await Personas.findAll(
            {
                attributes: ['id', 'name', 'lastname', 'identification', 'correo', 'clave']
                
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

    // crearPerson,
    loginA,
    // verAll,
    // editarPer,
    // eliminarPer,
    // verAdmin,
    // verProfesor,
    // verEstudiante,
    // login
}