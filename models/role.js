'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.User, {
        through: models.UsersRolesOrganizations,
        foreignKey: 'roleId',
        as: 'usersRolesOrganizations',
      });

      Role.belongsToMany(models.Permission, {
        through: models.RolesPermissions,
        foreignKey: 'roleId',
        as: 'permissions',
      });

      Role.hasMany(models.RolesPermissions, {
        foreignKey: 'roleId',
        as: 'rolesPermissions',
      });
    }
  }
  Role.init(
    {
      slug: { type: DataTypes.STRING(60), allowNull: false },
      description: { type: DataTypes.STRING(255), allowNull: true },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
    }
  );
  return Role;
};
