const { Tareas } = require('../models/index');
const  fs = require('fs-extra');
const { unlink  }  = require('fs-extra');
const  path = require('path');

async function prueba(req, res) {
    try {
        let file = req.files.deber_archivo
        if (file.originalFilename == "" || !file.originalFilename) {
            fs.unlinkSync(file.path)
            return res.status(400).json({
                transaccion: false,
                data: null,
                msg: 'No existe'
            })
        } else {
            let url = file.path
            url = url.split('/')
            let urlFile = url[url.length - 1]
            const tarea = await Tareas.create({
                deber_archivo: file.originalFilename,
                tareae: {
                    name: req.body.name,
                    lastname: req.body.lastname
                }
            }, {
                include: 'tareae'
            }).then(tarea => {
                res.status(200).json(tarea);
            })
        }

    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function addTarea(req, res) {
    try {
        const tarea = await Tareas.create({
            deber_archivo: req.body.deber_archivo,
            tareae: {
                name: req.body.name,
                lastname: req.body.lastname
            }
        }, {
            include: 'tareae'
        }).then(tarea => {
            res.status(200).json(tarea);
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function editTarea(req, res) {
    try {
        const id = req.params.id
      
        const tarea = await Tareas.update(req.body, {
            where: {
                id: id
            }
        }).then(tarea => {
            res.status(200).json(tarea);
            console.log(tarea)
           
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function upTarea(req, res) {
    try {
        let deber_archivo = req.params.deber_archivo,
            directory = req.params.directory,
            file = req.files.deber_archivo

            tarea = await Tareas.findAll({})
            if (!tarea) {
                res.send('No existe el archivo')
            } else {
                let dir = `./files/${directory}/${deber_archivo}`
                fs.exists(dir, (exists) => {
                    if (exists) {
                        fs.unlink(dir, (deleted) => {
                            if (!deleted) {
                                let url = file.path.split('/')

                            }
                        })
                    }
                })
            }

    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function byId(req, res) {
    try {
        const tarea = await Tareas.findByPk(req.params.id, {
            include: {
                association: "tareae",
                attributes: ['id', 'name', 'lastname']
            }
        })
        res.json(tarea);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}


async function verTarea(req, res) {
    try {
        let deber_archivo = req.params.deber_archivo,
            directory = req.params.directory

        const tarea = await Tareas.findAll({})
        if (!tarea) {
            res.send('No existe')
        } else {
            let ruta = `./files/${directory}/${deber_archivo}`
            fs.exists(ruta, (exists) => {
                if (exists) {
                    return res.status(200).sendFile(path.resolve(ruta))
                } else {
                    return res.status(400).send('No disponible')
                }
            })
        }
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function allTarea(req, res) {
    try {
        const tarea = await Tareas.findAll(
            {
                include: {
                    association: "tareae",
                    attributes: ['id', 'name', 'lastname']
                }
            },
        )
        res.json(tarea);
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}

async function deleteTarea(req, res) {
    try {
        const tarea = await Tareas.destroy({
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


async function borrar(req, res) {
    try {
        let deber_archivo = req.params.deber_archivo,
            directory = req.params.directory,
            ruta = `./files/${directory}/${deber_archivo}`

            console.log(deber_archivo)

        const tarea = await Tareas.destroy({ where: {deber_archivo: deber_archivo} })
        console.log(tarea)
        if (tarea) {
            fs.unlink(ruta, (exist) => {
                if (!exist) {
                    return res.status(200).send('borrado')
                } else {
                    return res.status(400).send('No disponible')
                }
            })
        } else {
           res.send('Algo salio mal')
        }
    } catch (error) {
        return res.status(400).json({
            msg: 'Mal',
            error
        })
    }
}

async function tareaMulter (req, res) {
    try {
        console.log(req.file)
        const tarea = await Tareas.create({
            deber_archivo : req.file.path,
            tareae : {
                name: req.body.name,
                lastname: req.body.lastname
            }
        }, {
            include: [ 'tareae' ]
        }).then(tarea => {
            res.status(200).json({
                tarea : tarea,
                msg : "Creado con exito"
            })
        } )
    } catch (error) {
        return res.status(400).json({
            msg: 'No se pudo crear',
            error
        })
    }
}




module.exports = {
    prueba,
    addTarea,
    allTarea,
    editTarea,
    deleteTarea,
    byId,
    upTarea,
    verTarea,
    borrar,
    tareaMulter
}