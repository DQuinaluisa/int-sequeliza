'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Matriculas.hasOne(models.Estudiante, { as: "estudiantes", foreignKey: "idMatricula" })
    }
  };
  Matriculas.init({
    codigoMatricula: DataTypes.STRING,
    numeroMatricula: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matriculas',
  });
  return Matriculas;
};