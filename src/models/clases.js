'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clases.hasMany(models.Cursos_Materia, { as: "class", foreignKey: "clasesId" })
      Clases.belongsTo(models.Estudiante, { as: "estudiante", foreignKey: "estudianteId" })
      Clases.belongsTo(models.Profesor, { as: "profesor", foreignKey: "profesorId" })
    }
  };
  Clases.init({
    tareas_realizar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clases',
  });
  return Clases;
};