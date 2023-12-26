'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Organization.belongsToMany(models.User, {
        through: models.UsersRolesOrganizations,
        foreignKey: 'organizationId',
        as: 'users',
      });
    }
  }
  Organization.init(
    {
      name: { type: DataTypes.STRING(320), allowNull: false },
      phone: { type: DataTypes.STRING(32), allowNull: false },
      email: { type: DataTypes.STRING(320), allowNull: false },
      country: { type: DataTypes.STRING(2), allowNull: false },
      address: { type: DataTypes.STRING(255), allowNull: false },
      city: { type: DataTypes.STRING(255), allowNull: false },
      postalCode: { type: DataTypes.STRING(12), allowNull: false },
    },
    {
      sequelize,
      modelName: 'Organization',
      tableName: 'organizations',
      freezeTableName: true,
      quoteIdentifiers: true,
    }
  );
  return Organization;
};
