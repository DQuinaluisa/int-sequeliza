'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {


  class Personas extends Model {
   
   
    static associate(models) {
      Personas.hasOne(models.Profesor, { as: "profesores", foreignKey: "idPersona" }),
      Personas.hasOne(models.Estudiante, { as: "estudiantes", foreignKey: "idPersona" }),
      Personas.hasMany(models.Roles, { as: "roles", foreignKey: "idPersona" }),
      Personas.hasMany(models.Tareas, { as: "tarea", foreignKey: "idPersona" }),
      Personas.hasMany(models.Clases, { as: "clases", foreignKey: "idPersona" })
    }

  
  }; 
  Personas.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    identificacion: DataTypes.STRING,
    direccion: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    contactoEmergencia: DataTypes.STRING,
    img: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Personas',
  });

  Personas.isAdmin = function(roles) {
    let tmArray = [];
    roles.forEach(role => tmArray.push(role.role));

    return tmArray.includes('admin');
  }
  

  Personas.isEstu = function(roles) {
    let tmArray = [];
    roles.forEach(role => tmArray.push(role.role));

    return tmArray.includes('estudiante');
  }

  Personas.isProfe = function(roles) {
    let tmArray = [];
    roles.forEach(role => tmArray.push(role.role));

    return tmArray.includes('profesor');
  }

  return Personas;
};