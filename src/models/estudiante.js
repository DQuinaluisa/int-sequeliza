'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estudiante.hasMany(models.Tareas, { as: "tareas", foreignKey: "estudianteId" })
      Estudiante.hasMany(models.Clases, { as: "clases", foreignKey: "estudianteId" })
    }
  };
  Estudiante.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    identification: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estudiante',
  });
  return Estudiante;
};