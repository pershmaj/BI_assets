/* jshint indent: 2 */
const { DataTypes, Sequelize} = require("sequelize");
const ModelName = "UserAssetToLike";
const TableName = "user_asset_to_like";
const ModelFunction = function (sequelize, DataTypes) {
  return sequelize.define(ModelName, ModelSchema, {
    tableName: TableName,
    timestamps: true,
    uniqueKeys: {
        Items_unique: {
            fields: ['asset_id', 'user_id']
        }
    }
  });
};

const ModelSchema = {
  asset_id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
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
