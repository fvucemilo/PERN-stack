'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolesPermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RolesPermissions.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        targetKey: 'id',
      });

      RolesPermissions.belongsTo(models.Permission, {
        foreignKey: 'permissionId',
        as: 'permission',
        targetKey: 'id',
      });
    }
  }
  RolesPermissions.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'roleId',
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'permissionId',
      },
    },
    {
      sequelize,
      modelName: 'RolesPermissions',
      tableName: 'roles_permissions',
      freezeTableName: true,
      quoteIdentifiers: true,
      indexes: [
        {
          unique: true,
          fields: ['roleId', 'permissionId'],
        },
      ],
    }
  );
  return RolesPermissions;
};
