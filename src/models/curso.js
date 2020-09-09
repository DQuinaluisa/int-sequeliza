'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Curso.hasMany(models.Materias, { as: "materias", foreignKey: "idCurso" }),
      Curso.hasMany(models.Clases, { as: "clases", foreignKey: "idCurso" })
      
    }
  };
  Curso.init({
    nombre_curso: DataTypes.STRING,
    nombre_paralelo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};