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
      Clases.hasMany(models.Tareas, { as: "tareas", foreignKey: "idClase" }),
      Clases.belongsTo(models.Curso, { as: "cursos", foreignKey: "idCurso" })
    }
  };
  Clases.init({
    nombre: DataTypes.STRING,
    detalle: DataTypes.STRING,
    tareasRealizar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Clases',
  });
  return Clases;
};