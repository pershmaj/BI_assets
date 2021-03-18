/* jshint indent: 2 */
const { DataTypes, Sequelize} = require("sequelize");
const ModelName = "Asset";
const TableName = "assets";
const ModelFunction = function (sequelize, DataTypes) {
  const Asset = sequelize.define(ModelName, ModelSchema, {
    tableName: TableName,
    timestamps: true,
  });

  Asset.associate = (models) => {
    const {
      User,
      UserAssetToLike,
    } = models;

    Asset.hasOne(User, {
      foreignKey: "user_id",
    });

    Asset.belongsToMany(User, {
      through: UserAssetToLike,
      as: "likes",
      foreignKey: "asset_id",
    });
  };

  return Asset;
};

const ModelSchema = {
  id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  link: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false,
    references: {
        model: "User",
        key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "created_at",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "updated_at",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
};

module.exports = ModelFunction;
