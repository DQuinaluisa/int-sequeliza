'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Materias.belongsTo(models.Profesor, { as: "profesores", foreignKey: "idProfesor"})
      Materias.belongsTo(models.Curso, { as: "cursos", foreignKey: "idCurso"})
    
    }
  };
  Materias.init({
    nombre_materia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materias',
  });
  return Materias;
};