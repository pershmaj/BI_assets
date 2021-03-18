'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            const DataTypes = Sequelize.DataTypes;
            return queryInterface.createTable(
                "assets",
                {
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
                },
                { transaction: t }
            );
        });
    },

    down: async (queryInterface, Sequelize) => {
        queryInterface.dropTable("assets");
    }
};
