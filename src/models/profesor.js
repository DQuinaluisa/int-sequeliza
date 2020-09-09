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
     Profesor.belongsTo(models.Personas, { as: "personas", foreignKey: "idPersona" }),
     Profesor.hasMany(models.Materias, { as: "materias", foreignKey: "idProfesor" })
    }
  };
  Profesor.init({
    correoInst: DataTypes.STRING,
    clave: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profesor',
  });
  return Profesor;
};