'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profesor.hasMany(models.Tareas, { as: "tareas", foreignKey: "profesorId" })
      Profesor.hasMany(models.Clases, { as: "clases", foreignKey: "profesorId" })
    }
  };
  Profesor.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    identification: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profesor',
  });
  return Profesor;
};