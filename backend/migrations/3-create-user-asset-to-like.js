'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            const DataTypes = Sequelize.DataTypes;
            return queryInterface.createTable(
                "user_asset_to_like",
                {
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
                },
                { transaction: t }
            ).then(() => 
                queryInterface.addIndex('Items_unique', ['asset_id', 'user_id'])
            );
        });
    },

    down: async (queryInterface, Sequelize) => {
        queryInterface.dropTable("user_asset_to_like");
    }
};
