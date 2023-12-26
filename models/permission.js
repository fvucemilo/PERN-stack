'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permission.belongsToMany(models.Role, {
        through: models.RolesPermissions,
        foreignKey: 'permissionId',
        as: 'roles',
      });
    }
  }
  Permission.init(
    {
      slug: { type: DataTypes.STRING(60), allowNull: false },
      description: { type: DataTypes.STRING(255), allowNull: true },
    },
    {
      sequelize,
      modelName: 'Permission',
      tableName: 'permissions',
      freezeTableName: true,
      quoteIdentifiers: true,
    }
  );
  return Permission;
};
