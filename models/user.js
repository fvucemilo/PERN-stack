'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: models.UsersRolesOrganizations,
        foreignKey: 'userId',
        as: 'roles',
      });

      User.hasMany(models.UsersRolesOrganizations, {
        foreignKey: 'userId',
        as: 'usersRolesOrganizations',
      });

      User.hasMany(models.Todo, {
        foreignKey: 'userId',
        as: 'todos',
      });
    }
  }
  User.init(
    {
      firstName: { type: DataTypes.STRING(80), allowNull: false },
      lastName: { type: DataTypes.STRING(100), allowNull: false },
      username: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(320), allowNull: false },
      password: { type: DataTypes.STRING(255), allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
      verificationToken: { type: DataTypes.STRING(64), allowNull: true, defaultValue: null },
      resetToken: { type: DataTypes.STRING(64), allowNull: true, defaultValue: null },
      isVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      freezeTableName: true,
      quoteIdentifiers: true,
    }
  );
  return User;
};
