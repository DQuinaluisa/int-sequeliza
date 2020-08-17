'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cursos_Materia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cursos_Materia.belongsTo(models.Materias, { as: "materias", foreignKey: "materiasId" })
      Cursos_Materia.belongsTo(models.Curso, { as: "curso", foreignKey: "cursosId" })
      Cursos_Materia.belongsTo(models.Tareas, { as: "tareass", foreignKey: "tareasId" })
      Cursos_Materia.belongsTo(models.Clases, { as: "class", foreignKey: "clasesId" })
    }
  };
  Cursos_Materia.init({
    materiasId: DataTypes.INTEGER,
    cursoId: DataTypes.INTEGER,
    tareasId: DataTypes.INTEGER,
    clasesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cursos_Materia',
  });
  return Cursos_Materia;
};