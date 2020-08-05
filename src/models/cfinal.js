'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cfinal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cfinal.init({
    examen_final: DataTypes.STRING,
    nota_final: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cfinal',
  });
  return Cfinal;
};