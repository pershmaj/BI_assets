/* jshint indent: 2 */
const { DataTypes, Sequelize} = require("sequelize");
const ModelName = "User";
const TableName = "users";
const ModelFunction = function (sequelize, DataTypes) {
  const User = sequelize.define(ModelName, ModelSchema, {
    tableName: TableName,
    timestamps: true,
  });

  User.associate = (models) => {
    const {
      Asset,
      UserAssetToLike,
    } = models;

    User.belongsTo(Asset, {
      as: "assets",
      foreignKey: "user_id",
    });

    User.belongsToMany(Asset, {
      through: UserAssetToLike,
      as: "likes",
      foreignKey: "user_id",
    });
  };

  return User;
};

const ModelSchema = {
  id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
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
