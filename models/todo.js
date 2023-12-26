'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Todo.init(
    {
      title: { type: DataTypes.STRING(320), allowNull: false },
      description: { type: DataTypes.TEXT('long'), allowNull: false },
    },
    {
      sequelize,
      modelName: 'Todo',
      tableName: 'todos',
      freezeTableName: true,
      quoteIdentifiers: true,
    }
  );
  return Todo;
};
