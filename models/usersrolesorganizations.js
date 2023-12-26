'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersRolesOrganizations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UsersRolesOrganizations.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        targetKey: 'id',
      });

      UsersRolesOrganizations.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        targetKey: 'id',
      });

      UsersRolesOrganizations.belongsTo(models.Organization, {
        foreignKey: 'organizationId',
        as: 'organization',
        targetKey: 'id',
      });
    }
  }
  UsersRolesOrganizations.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Role',
          key: 'id',
        },
      },
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Organization',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UsersRolesOrganizations',
      tableName: 'users_roles_organizations',
      freezeTableName: true,
      quoteIdentifiers: true,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'roleId', 'organizationId'],
        },
      ],
    }
  );
  return UsersRolesOrganizations;
};
