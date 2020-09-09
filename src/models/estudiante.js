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
     Estudiante.belongsTo(models.Personas, { as: "personas", foreignKey: "idPersona" }),
     Estudiante.belongsTo(models.Matriculas, { as: "matriculas", foreignKey: "idMatricula" })
    }
  };
  Estudiante.init({
    correoInst: DataTypes.STRING,
    clave: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Estudiante',
  });
  return Estudiante;
};