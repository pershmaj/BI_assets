'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      const DataTypes = Sequelize.DataTypes;
      return queryInterface.createTable(
        "users",
        {
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
        },
        { transaction: t }
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("users");
  }
};
