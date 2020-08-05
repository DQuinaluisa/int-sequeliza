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
      // define association here
    }
  };
  Tareas.init({
    deber_archivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tareas',
  });
  return Tareas;
};