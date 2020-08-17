'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tareas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tareas.hasMany(models.Cursos_Materia, { as: "tareass", foreignKey: "tareasId" })
      Tareas.belongsTo(models.Estudiante, { as: "tareae", foreignKey: "estudianteId" })
      Tareas.belongsTo(models.Profesor, { as: "tareap", foreignKey: "profesorId" })
    }
  };
  Tareas.init({
    deber_archivo: DataTypes.STRING,
    nota: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tareas',
  });
  return Tareas;
};